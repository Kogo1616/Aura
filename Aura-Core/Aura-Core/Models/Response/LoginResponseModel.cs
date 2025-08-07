namespace Aura_Core.Models.Response;

public class LoginResponseModel
{
    public string TokenType { get; set; } = "Bearer";
    public string AccessToken { get; set; }
    public int ExpiresIn { get; set; }
    public string RefreshToken { get; set; }
    public AuthUserModel User { get; set; }
}

public class AuthUserModel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
}