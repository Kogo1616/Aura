using Aura_Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aura_Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProviderController : ControllerBase
{
    private readonly IProviderService _providerService;

    public ProviderController(IProviderService providerService)
    {
        _providerService = providerService;
    }

    [Authorize]
    [HttpGet("providers")]
    public async Task<IActionResult> Providers()
    {
        var providers = await _providerService.GetProviders();
        return Ok(providers);
    }

    [HttpGet("get-skills")]
    public IActionResult Skills()
    {
        var skills = _providerService.GetSkills();
        return Ok(skills);
    }
}