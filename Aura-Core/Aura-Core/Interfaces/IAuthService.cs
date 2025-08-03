using Aura_Core.Models.Request;
using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Interfaces;

public interface IAuthService
{
    Task<IdentityResult> Register(UserRegisterReuquestModel request);
}