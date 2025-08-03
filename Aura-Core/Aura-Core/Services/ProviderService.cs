using Aura_Core.DbContext;
using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Aura_Core.Services;

public class ProviderService : IUserService
{
    private readonly AuraDbContext _dbContext;
    private readonly UserManager<User> _userManager;

    public ProviderService(AuraDbContext dbContext, UserManager<User> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    public async Task<List<User>> GetUsers()
    {
        var providers = (await _userManager.GetUsersInRoleAsync("Provider")).ToList();
        
        return providers;
    }
}