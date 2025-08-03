using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;
using Aura_Core.Models.Request;
using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;

    public AuthService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IdentityResult> Register(UserRegisterReuquestModel request)
    {
        var user = new User { UserName = request.UserName, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);
        await _userManager.AddToRoleAsync(user, request.Role);

        return result;
    }
}