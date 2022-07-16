using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
         void Update(AppUser user);
         Task<bool> saveAllAsync();
         Task<IEnumerable<AppUser>> GetUsersAsync();
         Task<AppUser> GetUserByIdAsync(String id);
         Task<AppUser> GetUserByUsernameAsync(String username);
         Task<IEnumerable<MemberDto>> GetMembersAsync();
         Task<MemberDto> GetMemberAsync(string username);
    }
}