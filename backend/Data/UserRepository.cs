using tricount.Models;

namespace tricount.Data;

public interface IUserRepository
{
    public List<User> FindAll();
    public User? FindById(int id);
    public User Create(User user);
}

public class UserRepository : IUserRepository
{
    private readonly ApplicationDBContext _ctx;

    public UserRepository(ApplicationDBContext context)
    {
        _ctx = context;
    }
    
    public List<User> FindAll()
    {
        return _ctx.Users.ToList();
    }

    public User? FindById(int id)
    {
        return _ctx.Users.Find(id);
    }

    public User Create(User user)
    {
        _ctx.Users.Add(user);
        _ctx.SaveChanges();
        return user;
    }
}