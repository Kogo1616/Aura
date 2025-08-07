using System.ComponentModel.DataAnnotations;

namespace Aura_Core.Models.Request;

public class UserLoginRequestModel
{
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
}