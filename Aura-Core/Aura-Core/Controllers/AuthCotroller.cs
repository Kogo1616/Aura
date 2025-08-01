using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aura_Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthCotroller : ControllerBase
{
    [AllowAnonymous]
    [HttpGet]
    public IActionResult Index()
    {
        return Ok(new { message = "Public access works." });
    }

    [Authorize]
    [HttpGet("protected")]
    public IActionResult ProtectedEndpoint()
    {
        return Ok(new { message = "You're authorized!" });
    }
}