using Aura_Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Aura_Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> Providers()
    {
        var providers = await _userService.GetUsers();
        return Ok(providers);
    }
}