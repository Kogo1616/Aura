namespace Aura_Core.Models.Response;

public class ProviderDetailResponseModel
{
    public string Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string? AvatarUrl { get; set; }
    public string PhoneNumber { get; set; }
    
    public string Location { get; set; }
    
    public bool IsAvaliable { get; set; }
    
    public string Bio { get; set; }

    public List<string> Skills { get; set; }
}