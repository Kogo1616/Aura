using Aura_Core.Models.DbModels;
using Aura_Core.Models.Response;

namespace Aura_Core.Interfaces;

public interface IProviderService
{
    Task<List<ProviderResponseModel>> GetProviders();
    ProviderDetailResponseModel GetProviderDetails(string providerId);
    List<Skill> GetSkills();
}