using Aura_Core.Interfaces;
using Aura_Core.Models;
using Aura_Core.Models.DbModels;
using Aura_Core.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Aura_Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthCotroller : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthCotroller(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginReuquestModel request)
    {
        var result = await _authService.Login(request);

        if (result.Succeeded)
            return Ok(new { Message = "Login successful" });

        return Unauthorized("Invalid credentials");
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