using Aura_Core.DbContext;
using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;
using Aura_Core.Models.Request;
using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly AuraDbContext _context;

    public AuthService(UserManager<User> userManager, AuraDbContext context)
    {
        _userManager = userManager;
        _context = context;
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
                .Where(s => request.Skills.Contains(s.Id))
                .ToDictionary(s => s.Id);

            foreach (var skillId in request.Skills)
            {
                if (validSkills.TryGetValue(skillId, out var skill))
                {
                    _context.ProviderSkills.Add(new ProviderSkill
                    {
                        UserId = user.Id,
                        SkillId = skill.Id
                    });
                }
            }
        }
    }
}