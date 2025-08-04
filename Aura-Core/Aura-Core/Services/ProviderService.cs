using Aura_Core.DbContext;
using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;
using Aura_Core.Models.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Aura_Core.Services;

public class ProviderService : IProviderService
{
    private readonly AuraDbContext _dbContext;
    private readonly UserManager<User> _userManager;

    public ProviderService(AuraDbContext dbContext, UserManager<User> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    public async Task<List<ProviderResponseModel>> GetProviders()
    {
        var providerUsers = await _userManager.GetUsersInRoleAsync("Provider");
        
        var providerIds = providerUsers
            .Select(u => u.Id)
            .ToList();

        var usersWithDetails = _dbContext.Users
            .Where(u => providerIds.Contains(u.Id))
            .Include(u => u.ProviderDetail)
            .ToList();

        var response = usersWithDetails.Select(user => new ProviderResponseModel
        {
            Id = user.Id,
            AvatarUrl = user.ProviderDetail?.AvatarUrl,
            FullName = $"{user.FirstName} {user.LastName}",
            Email = user.Email,
            PhoneNumber = user.PhoneNumber
        }).ToList();

        return response;
    }

    public List<Skill> GetSkills()
    {
        return _dbContext.Skills
            .Where(x => x.Status)
            .ToList();
    }
}