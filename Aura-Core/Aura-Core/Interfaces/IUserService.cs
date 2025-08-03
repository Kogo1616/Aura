using Aura_Core.Models.DbModels;

namespace Aura_Core.Interfaces;

public interface IUserService
{
    Task<List<User>> GetUsers();
}