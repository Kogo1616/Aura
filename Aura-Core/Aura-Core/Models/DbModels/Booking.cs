using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura_Core.Models.DbModels;

public class Booking
{
    [Key] public int Id { get; set; }

    public DateTime AppointmentDate { get; set; }
    public string Status { get; set; } = "Pending";
    public string? Notes { get; set; }

    [Required] public int ServiceId { get; set; }

    [ForeignKey(nameof(ServiceId))] public Service Service { get; set; }

    [Required] public string UserId { get; set; }

    [ForeignKey(nameof(UserId))] public User User { get; set; }
}