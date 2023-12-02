using tricount.Data;
using tricount.Models;

namespace tricount.Services;

public interface ITricountService
{
    public void CreateTricount(List<int> userIds, Tricount tricount);
    public List<Tricount> FindAll();
    public Tricount FindById(int id);
    public void Delete(int id);
}

public class TricountService: ITricountService
{
    private readonly ITricountRepository _tricountRepository;
    private readonly IUserRepository _userRepository;
    
    public TricountService(IUserRepository userRepository, ITricountRepository tricountRepository)
    {
        _tricountRepository = tricountRepository;
        _userRepository = userRepository;
    }
    
    public void CreateTricount(List<int> userIds, Tricount tricount)
    {
        var users = userIds.Select(userId => _userRepository.FindById(userId)).ToList();
        if (users.Any())
        {
            tricount.Users = users;
        }
        _tricountRepository.Create(tricount);
    }

    public List<Tricount> FindAll()
    {
        return _tricountRepository.FindAll();
    }

    public Tricount FindById(int id)
    {
        return _tricountRepository.FindById(id);
    }

    public void Delete(int id)
    {
        _tricountRepository.Delete(id);
    }
}