using tricount.Data;
using tricount.Models;

namespace tricount.Services;

public interface IUserService
{
    public void CreateUser(List<int> tricountIds, User user);
    public List<User> FindAll();
    public User FindById(int id);
    public void Delete(int id);
}

public class UserService: IUserService
{
    private readonly ITricountRepository _tricountRepository;
    private readonly IUserRepository _userRepository;
    
    public UserService(ITricountRepository tricountRepository, IUserRepository userRepository)
    {
        _tricountRepository = tricountRepository;
        _userRepository = userRepository;
    }
    
    public void CreateUser(List<int> tricountIds, User user)
    {
        var tricounts = tricountIds.Select(tricountId => _tricountRepository.FindById(tricountId)).ToList();
        if (tricounts.Any())
        {
            user.Tricounts = tricounts;
        }
        _userRepository.Create(user);
    }

    public List<User> FindAll()
    {
        return _userRepository.FindAll();
    }

    public User FindById(int id)
    {
        return _userRepository.FindById(id);
    }

    public void Delete(int id)
    {
        _userRepository.Delete(id);
    }
}