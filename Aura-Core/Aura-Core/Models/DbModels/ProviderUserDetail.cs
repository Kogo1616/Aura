using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura_Core.Models.DbModels;

public class ProviderUserDetail
{
    [Key] public int Id { get; set; }

    [Required] public string UserId { get; set; }

    public string? AvatarUrl { get; set; }

    public string Bio { get; set; }

    public bool IsAvailable { get; set; } = true;

    public string? Location { get; set; }

    public List<Service> Services { get; set; } = new();

    public List<Review> Reviews { get; set; } = new();

    [ForeignKey("UserId")] public User User { get; set; }
}