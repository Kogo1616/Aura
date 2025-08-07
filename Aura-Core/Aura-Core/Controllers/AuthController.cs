using Aura_Core.Interfaces;
using Aura_Core.Models.Request;
using Microsoft.AspNetCore.Mvc;

namespace Aura_Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequestModel request)
    {
        var result = await _authService.Login(request);

        if (!result.Succeeded)
            return Unauthorized(result.Errors);

        return Ok(result.Data);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterReuquestModel request)
    {
        var result = await _authService.Register(request);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { Message = "Registered" });
    }
}