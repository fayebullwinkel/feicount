using feicount.Controllers.Types;
using feicount.Models;

namespace feicount.Controllers.Mappers;

public interface IUserMapper
{
    public User ToUser(UserDto dto, List<Feicount> feicounts, List<Expense> expenses);
    public UserDto ToUserDto(User model);
}

public class UserMapper: IUserMapper
{
    public User ToUser(UserDto dto, List<Feicount> feicounts, List<Expense> expenses)
    {
        return new User
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Feicounts = feicounts,
            Expenses = expenses
        };
    }
    
    public UserDto ToUserDto(User model)
    {
        return new UserDto
        {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            FeicountIds = model.Feicounts.Select(feicount => feicount.Id).ToList(),
            ExpenseIds = model.Expenses.Select(expense => expense.Id).ToList()
        };
    }
}