using Aura_Core.Interfaces;
using Aura_Core.Models.DbModels;
using Aura_Core.Models.Request;
using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthService(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<SignInResult> Login(UserLoginReuquestModel request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return SignInResult.Failed;

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, isPersistent: false, lockoutOnFailure: false);

        return result;
    }

    public async Task<IdentityResult> Register(UserRegisterReuquestModel request)
    {
        var user = new User { UserName = request.UserName, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);

        return result;
    }
}