using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura_Core.Models.DbModels;

public class Review
{
    [Key] public int Id { get; set; }

    [Range(1, 5)] public int Rating { get; set; }

    public string? Comment { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Required] public int ProviderId { get; set; }

    [ForeignKey(nameof(ProviderId))] public ProviderUserDetail ProviderUserDetail { get; set; }

    public string? UserId { get; set; }

    [ForeignKey(nameof(UserId))] public User? User { get; set; }
}