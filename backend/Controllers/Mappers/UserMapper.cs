using tricount.Models;

namespace tricount.Controllers.Mappers;

public interface IUserMapper
{
    public User ToUser(UserDto dto);
    public UserDto ToUserDto(User model);
}

public class UserMapper: IUserMapper
{
    public User ToUser(UserDto dto)
    {
        return new User
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };
    }
    
    public UserDto ToUserDto(User model)
    {
        return new UserDto
        {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            TricountIds = model.Tricounts.Select(tricount => tricount.Id).ToList()
        };
    }
}