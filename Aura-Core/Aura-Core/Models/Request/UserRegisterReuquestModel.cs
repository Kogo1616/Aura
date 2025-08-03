using System.ComponentModel.DataAnnotations;

namespace Aura_Core.Models.Request;

public class UserRegisterReuquestModel
{
    [Required] public string Email { get; set; }
    [Required] public string UserName { get; set; }
    [Required] public string Password { get; set; }
    [Required] public string Role { get; set; }
    [Required] public string Number { get; set; }
}