using feicount.Controllers.Mappers;
using feicount.Controllers.Types;
using feicount.Data;
using feicount.Models;

namespace feicount.Services;

public interface IUserService
{
    public void CreateUser(UserDto dto);
    public List<User> FindAll();
    public User FindById(int id);
    public void Delete(int id);
}

public class UserService: IUserService
{
    private readonly IFeicountRepository _feicountRepository;
    private readonly IUserRepository _userRepository;
    private readonly IExpenseRepository _expenseRepository;
    private readonly IUserMapper _userMapper;
    
    public UserService(IFeicountRepository feicountRepository, IUserRepository userRepository, IExpenseRepository expenseRepository, IUserMapper userMapper)
    {
        _feicountRepository = feicountRepository;
        _userRepository = userRepository;
        _expenseRepository = expenseRepository;
        _userMapper = userMapper;
    }
    
    public void CreateUser(UserDto dto)
    {
        var feicounts = (dto.FeicountIds ?? throw new InvalidOperationException()).Select(feicountId => _feicountRepository.FindById(feicountId)).ToList();
        var expenses = (dto.ExpenseIds ?? throw new InvalidOperationException()).Select(expenseId => _expenseRepository.FindById(expenseId)).ToList();
        
        if (feicounts.Any(t => t == null))
        {
            throw new ArgumentNullException($"{feicounts} not found.");
        }

        if (expenses.Any(e => e == null))
        {
            throw new ArgumentNullException($"One or more {expenses} not found.");
        }
        
        var user = _userMapper.ToUser(dto, feicounts!, expenses!);
        user.Feicounts = feicounts!;
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