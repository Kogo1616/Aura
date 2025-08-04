using System.ComponentModel.DataAnnotations;

namespace Aura_Core.Models.Request;

public class UserRegisterReuquestModel
{
    [Required] public string FirstName { get; set; }
    [Required] public string LastName { get; set; }
    [Required] public string Email { get; set; }
    [Required] public string PhoneNumber { get; set; }
    [Required] public string UserName { get; set; }
    [Required] public string Password { get; set; }
    [Required] public string Role { get; set; }
    //[Required] public string Location { get; set; }
    public string AvatarUrl { get; set; }
    public string Bio { get; set; }
    
    public List<int>? Skills { get; set; }
}