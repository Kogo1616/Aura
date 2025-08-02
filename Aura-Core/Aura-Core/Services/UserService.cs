using Aura_Core.DbContext;
using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;

namespace Aura_Core.Services;

public class UserService : IUserService
{
    private readonly AuraDbContext _dbContext;

    public UserService(AuraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<User> GetUsers()
    {
        var users = _dbContext.Users.ToList();
        return users;
    }
}