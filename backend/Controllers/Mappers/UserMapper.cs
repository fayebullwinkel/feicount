using tricount.Controllers.Types;
using tricount.Models;

namespace tricount.Controllers.Mappers;

public interface IUserMapper
{
    public User ToUser(UserDto dto, List<Tricount> tricounts, List<Expense> expenses);
    public UserDto ToUserDto(User model);
}

public class UserMapper: IUserMapper
{
    public User ToUser(UserDto dto, List<Tricount> tricounts, List<Expense> expenses)
    {
        return new User
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Tricounts = tricounts,
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
            TricountIds = model.Tricounts.Select(tricount => tricount.Id).ToList(),
            ExpenseIds = model.Expenses.Select(expense => expense.Id).ToList()
        };
    }
}