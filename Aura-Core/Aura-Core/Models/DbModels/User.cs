using Microsoft.AspNetCore.Identity;

namespace Aura_Core.Models.DbModels;

public class User : IdentityUser
{
}

public class ProviderUserDetail
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string AvatarUrl { get; set; }
    public string Role { get; set; } = "provider";

    public User User { get; set; }
    public List<Service> Services { get; set; }
    public List<Review> Reviews { get; set; }
}

public class Service
{
    public ProviderUserDetail ProviderUserDetail { get; set; }
}

public class Review
{
    
}