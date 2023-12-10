using tricount.Controllers.Mappers;
using tricount.Controllers.Types;
using tricount.Data;
using tricount.Models;

namespace tricount.Services;

public interface IUserService
{
    public void CreateUser(UserDto dto);
    public List<User> FindAll();
    public User FindById(int id);
    public void Delete(int id);
}

public class UserService: IUserService
{
    private readonly ITricountRepository _tricountRepository;
    private readonly IUserRepository _userRepository;
    private readonly IExpenseRepository _expenseRepository;
    private readonly IUserMapper _userMapper;
    
    public UserService(ITricountRepository tricountRepository, IUserRepository userRepository, IExpenseRepository expenseRepository, IUserMapper userMapper)
    {
        _tricountRepository = tricountRepository;
        _userRepository = userRepository;
        _expenseRepository = expenseRepository;
        _userMapper = userMapper;
    }
    
    public void CreateUser(UserDto dto)
    {
        var tricounts = (dto.TricountIds ?? throw new InvalidOperationException()).Select(tricountId => _tricountRepository.FindById(tricountId)).ToList();
        var expenses = (dto.ExpenseIds ?? throw new InvalidOperationException()).Select(expenseId => _expenseRepository.FindById(expenseId)).ToList();
        
        if (tricounts.Any(t => t == null))
        {
            throw new ArgumentNullException($"{tricounts} not found.");
        }

        if (expenses.Any(e => e == null))
        {
            throw new ArgumentNullException($"One or more {expenses} not found.");
        }
        
        var user = _userMapper.ToUser(dto, tricounts!, expenses!);
        user.Tricounts = tricounts!;
        _userRepository.Create(user);
    }

    public List<User> FindAll()
    {
        return _userRepository.FindAll();
    }

    public User FindById(int id)
    {
        return _userRepository.FindById(id) ?? throw new InvalidOperationException();
    }

    public void Delete(int id)
    {
        _userRepository.Delete(id);
    }
}