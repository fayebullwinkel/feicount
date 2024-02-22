using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;

public interface ITricountRepository
{
    public List<Tricount> FindAll();
    public Tricount? FindById(int id);
    public Tricount Create(Tricount tricount);
    public void Delete(int id);
    public void AddExpenseToTricount(Tricount tricount, Expense expense);
    public void AddUserToTricount(Tricount tricount, User user);
    public List<User> GetUsers(int id);
    public void DeleteTricountUser(Tricount tricount, User user);
    public Tricount? GetTricountForExpense(int expenseId);
}

public class TricountRepository : ITricountRepository
{
    private readonly ApplicationDBContext _ctx;

    public TricountRepository(ApplicationDBContext context)
    {
        _ctx = context;
    }
    
    public List<Tricount> FindAll()
    {
        return _ctx.Tricounts
            .Include(t => t.Users)
            .Include(t => t.Expenses)
            .ToList();
    }

    public Tricount? FindById(int id)
    {
        return _ctx.Tricounts
            .Include(t => t.Users)
            .Include(t => t.Expenses)
                .ThenInclude(e => e.Recipients)
            .FirstOrDefault(t => t.Id == id);
    }

    public Tricount Create(Tricount tricount)
    {
        _ctx.Tricounts.Add(tricount);
        _ctx.SaveChanges();
        return tricount;
    }

    public void Delete(int id)
    {
        var tricount = FindById(id);
        _ctx.Tricounts.Remove(tricount);
        _ctx.SaveChanges();
    }

    public void AddExpenseToTricount(Tricount tricount, Expense expense)
    {
        tricount.Expenses.Add(expense);
        _ctx.SaveChanges();
    }
    
    public void AddUserToTricount(Tricount tricount, User user)
    {
        tricount.Users.Add(user);
        _ctx.SaveChanges();
    }

    public List<User> GetUsers(int id)
    {
        var tricount = FindById(id);
        return tricount.Users;
    }

    public void DeleteTricountUser(Tricount tricount, User user)
    {
        tricount.Users.Remove(user);
        _ctx.SaveChanges();
    }

    public Tricount? GetTricountForExpense(int expenseId)
    {
        return _ctx.Tricounts.FirstOrDefault(t => t.Id == expenseId);
    }
}