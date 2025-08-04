using Aura_Core.Models.DbModels;

namespace Aura_Core.Interfaces;

public interface IProviderService
{
    Task<List<User>> GetUsers();
    List<Skill> GetSkills();
}