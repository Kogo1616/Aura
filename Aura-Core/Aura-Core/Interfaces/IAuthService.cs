using Aura_Core.Models.Request;
using Aura_Core.Models.Response;
using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Interfaces;

public interface IAuthService
{
    Task<IdentityResult> Register(UserRegisterReuquestModel request);
    Task<ServiceResponse<LoginResponseModel>> Login(UserLoginRequestModel request);
}