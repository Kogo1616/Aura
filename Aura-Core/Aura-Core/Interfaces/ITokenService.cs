using Aura_Core.Models.DbModels;

namespace Aura_Core.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}