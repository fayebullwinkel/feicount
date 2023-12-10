using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;

public interface IUserRepository
{
    public List<User> FindAll();
    public User? FindById(int id);
    public User Create(User user);
    public void Delete(int id);
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
        return _ctx.Users
            .Include(u => u.Tricounts)
            .Include(u => u.Expenses)
            .ToList();
    }

    public User? FindById(int id)
    {
        return _ctx.Users
            .Include(u => u.Tricounts)
            .Include(u => u.Expenses)
            .FirstOrDefault(u => u.Id == id);
    }

    public User Create(User user)
    {
        _ctx.Users.Add(user);
        _ctx.SaveChanges();
        return user;
    }

    public void Delete(int id)
    {
        var user = FindById(id);
        _ctx.Users.Remove(user);
        _ctx.SaveChanges();
    }
}