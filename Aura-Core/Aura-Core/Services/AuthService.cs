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

            // Assign role
            await _userManager.AddToRoleAsync(user, request.Role);

            // Insert additional data
            if (request.Role.Equals("provider", StringComparison.OrdinalIgnoreCase))
            {
                var providerDetail = new ProviderUserDetail
                {
                    UserId = user.Id,
                    AvatarUrl = request.AvatarUrl,
                    Bio = request.Bio,
                    User = user
                };

              await  _context.ProviderUserDetails.AddAsync(providerDetail);

                // // Optionally handle skills if needed
                // if (request.Skills != null && request.Skills.Any())
                // {
                //     foreach (var skillName in request.Skills)
                //     {
                //         var skill = _context.Skills
                //             .FirstOrDefault(s => s.Name == skillName);
                //
                //         if (skill == null)
                //         {
                //             skill = new Skill { Name = skillName };
                //             _context.Skills.Add(skill);
                //             await _context.SaveChangesAsync();
                //         }
                //
                //         _context.ProviderSkills.Add(new ProviderSkill
                //         {
                //             UserId = user.Id,
                //             SkillId = skill.Id
                //         });
                //     }
                // }
            }
            else if (request.Role.Equals("user", StringComparison.OrdinalIgnoreCase))
            {
                var regularDetail = new RegularUserDetail
                {
                    UserId = user.Id,
                    User = user
                };

                await _context.RegularUserDetails.AddAsync(regularDetail);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return createResult;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            // Optionally log exception
            throw new ApplicationException("User registration failed.", ex);
        }
    }
}