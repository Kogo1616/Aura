using System.ComponentModel.DataAnnotations;

namespace Aura_Core.Models.DbModels;

public class Skill
{
    [Key] public int Id { get; set; }

    [Required] public string Name { get; set; }
    public bool Status { get; set; } = true;

    public List<ProviderSkill> ProviderSkills { get; set; }
}