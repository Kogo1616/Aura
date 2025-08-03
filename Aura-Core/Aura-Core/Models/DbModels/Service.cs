using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura_Core.Models.DbModels;

public class Service
{
    [Key] public int Id { get; set; }

    [Required] public string Title { get; set; }

    public string? Description { get; set; }
    public decimal Price { get; set; }
    public TimeSpan Duration { get; set; }
    public string Category { get; set; }
    public bool IsAvailable { get; set; } = true;

    [Required] public int ProviderId { get; set; }

    [ForeignKey(nameof(ProviderId))] public ProviderUserDetail ProviderUserDetail { get; set; }

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}