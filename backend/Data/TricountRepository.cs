using Microsoft.EntityFrameworkCore;
using feicount.Models;

namespace feicount.Data;

public interface IFeicountRepository
{
    public List<Feicount> FindAll();
    public Feicount? FindById(int id);
    public Feicount Create(Feicount feicount);
    public void Delete(int id);
    public void AddExpenseToFeicount(Feicount feicount, Expense expense);
    public void AddUserToFeicount(Feicount feicount, User user);
    public List<User> GetUsers(int id);
    public void DeleteFeicountUser(Feicount feicount, User user);
    public Feicount? GetFeicountForExpense(int expenseId);
}

public class FeicountRepository : IFeicountRepository
{
    private readonly ApplicationDBContext _ctx;

    public FeicountRepository(ApplicationDBContext context)
    {
        _ctx = context;
    }
    
    public List<Feicount> FindAll()
    {
        return _ctx.Feicounts
            .Include(t => t.Users)
            .Include(t => t.Expenses)
            .ToList();
    }

    public Feicount? FindById(int id)
    {
        return _ctx.Feicounts
            .Include(t => t.Users)
            .Include(t => t.Expenses)
                .ThenInclude(e => e.Recipients)
            .FirstOrDefault(t => t.Id == id);
    }

    public Feicount Create(Feicount feicount)
    {
        _ctx.Feicounts.Add(feicount);
        _ctx.SaveChanges();
        return feicount;
    }

    public void Delete(int id)
    {
        var feicount = FindById(id);
        _ctx.Feicounts.Remove(feicount);
        _ctx.SaveChanges();
    }

    public void AddExpenseToFeicount(Feicount feicount, Expense expense)
    {
        feicount.Expenses.Add(expense);
        _ctx.SaveChanges();
    }
    
    public void AddUserToFeicount(Feicount feicount, User user)
    {
        feicount.Users.Add(user);
        _ctx.SaveChanges();
    }

    public List<User> GetUsers(int id)
    {
        var feicount = FindById(id);
        return feicount.Users;
    }

    public void DeleteFeicountUser(Feicount feicount, User user)
    {
        feicount.Users.Remove(user);
        _ctx.SaveChanges();
    }

    public Feicount? GetFeicountForExpense(int expenseId)
    {
        return _ctx.Feicounts.FirstOrDefault(t => t.Id == expenseId);
    }
}