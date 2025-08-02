using Aura_Core.Models.DbModels;

namespace Aura_Core.Interfaces;

public interface IUserService
{
    List<User> GetUsers();
}