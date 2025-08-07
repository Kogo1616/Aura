using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aura_Core.Models.DbModels;

public class ProviderSkill
{
    [Key] public int Id { get; set; }

    [Required] public int SkillId { get; set; }

    [ForeignKey(nameof(SkillId))] public Skill Skill { get; set; }

    public int ProviderProfileId { get; set; }

    [ForeignKey(nameof(ProviderProfileId))]  public ProviderUserDetail ProviderUserDetail { get; set; }
}