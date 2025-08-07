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
            .ThenInclude(pd => pd.ProviderSkills)
            .ThenInclude(ps => ps.Skill)
            .ToList();

        var response = usersWithDetails.Select(user => new ProviderResponseModel
        {
            Id = user.Id,
            FullName = $"{user.FirstName} {user.LastName}",
            AvatarUrl = user.ProviderDetail?.AvatarUrl,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Skills = user.ProviderDetail?.ProviderSkills
                .Select(ps => ps.Skill.Name)
                .ToList() ?? new List<string>()
        }).ToList();

        return response;
    }

    public ProviderDetailResponseModel GetProviderDetails(string providerId)
    {
        var providerDetails = _dbContext.ProviderUserDetails
            .Include(x => x.User)
            .Include(pd => pd.ProviderSkills)
            .ThenInclude(ps => ps.Skill)
            .FirstOrDefault(x => x.UserId == providerId);

        if (providerDetails == null)
        {
            return new ProviderDetailResponseModel();
        }

        var response = new ProviderDetailResponseModel
        {
            Id = providerDetails.User.Id,
            FullName = providerDetails.User.FirstName + " " + providerDetails.User.LastName,
            Email = providerDetails.User.Email,
            PhoneNumber = providerDetails.User.PhoneNumber,
            AvatarUrl = providerDetails.AvatarUrl,
            Bio = providerDetails.Bio,
            IsAvaliable = providerDetails.IsAvailable,
            Location = providerDetails.Location,
            Skills = providerDetails.ProviderSkills
                .Select(ps => ps.Skill.Name)
                .ToList(),
        };

        return response;
    }

    public List<Skill> GetSkills()
    {
        return _dbContext.Skills
            .Where(x => x.Status)
            .ToList();
    }
}