using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Models.DbModels;

public class User : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public ProviderUserDetail? ProviderDetail { get; set; }
    public RegularUserDetail? RegularDetail { get; set; }
}