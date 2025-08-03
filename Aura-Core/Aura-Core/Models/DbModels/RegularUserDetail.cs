using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura_Core.Models.DbModels;

public class RegularUserDetail
{
    [Key] public int Id { get; set; }

    [Required] public string UserId { get; set; }

    public string PreferredLanguage { get; set; }
    public string Location { get; set; }
    public DateTime DateOfBirth { get; set; }

    [ForeignKey("UserId")] public User User { get; set; }
}