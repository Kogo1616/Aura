using Aura_Core.DbContext;
using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;
using Aura_Core.Models.Request;
using Aura_Core.Models.Response;
using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly AuraDbContext _context;

    public AuthService(UserManager<User> userManager, AuraDbContext context, ITokenService tokenService)
    {
        _userManager = userManager;
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<IdentityResult> Register(UserRegisterReuquestModel request)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.UserName,
                PhoneNumber = request.PhoneNumber,
            };

            var createResult = await _userManager.CreateAsync(user, request.Password);
            if (!createResult.Succeeded)
                return createResult;

            await _userManager.AddToRoleAsync(user, request.Role);

            var normalizedRole = request.Role?.Trim().ToLowerInvariant();

            if (normalizedRole == "provider")
            {
                await CreateProviderDetailsAsync(user, request);
            }
            else if (normalizedRole == "user")
            {
                await _context.RegularUserDetails.AddAsync(new RegularUserDetail
                {
                    UserId = user.Id
                });
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return createResult;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw new ApplicationException("User registration failed.", ex);
        }
    }

    public async Task<ServiceResponse<LoginResponseModel>> Login(UserLoginRequestModel request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return ServiceResponse<LoginResponseModel>.Fail("Invalid credentials");
        }

        // Token generation (simplified example)
        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        return ServiceResponse<LoginResponseModel>.Success(new LoginResponseModel
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = 3600,
            User = new AuthUserModel
            {
                Id = user.Id,
                Name = user.UserName,
                Email = user.Email,
                Role = "User", // Or fetch from user roles
            }
        });
    }

    private async Task CreateProviderDetailsAsync(User user, UserRegisterReuquestModel request)
    {
        var providerDetail = new ProviderUserDetail
        {
            UserId = user.Id,
            AvatarUrl = request.AvatarUrl,
            Location = "Kutaisi", // You may want to make this dynamic later
            Bio = request.Bio
        };

        await _context.ProviderUserDetails.AddAsync(providerDetail);

        if (request.Skills?.Any() == true)
        {
            var validSkills = _context.Skills
                .Where(x => request.Skills.Contains(x.SkillId))
                .Select(x => x.SkillId);

            foreach (var skillId in request.Skills)
            {
                _context.ProviderSkills.Add(new ProviderSkill
                {
                    //ProviderProfileId = user.Id,
                    SkillId = skillId
                });
            }
        }
    }
}