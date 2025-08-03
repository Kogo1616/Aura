using Aura_Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Aura_Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProviderController : ControllerBase
{
    private readonly IUserService _userService;

    public ProviderController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("providers")]
    public async Task<IActionResult> Providers()
    {
        var providers = await _userService.GetUsers();
        return Ok(providers);
    }
}