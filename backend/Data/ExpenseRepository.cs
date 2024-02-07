using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;

public interface IExpenseRepository
{
    public List<Expense> FindAll();
    public Expense? FindById(int id);
    public List<Expense> FindForTricount(int tricountId);
    public void Delete(int expenseId);
    public void Create(Expense expense);
}

public class ExpenseRepository : IExpenseRepository
{
    private readonly ApplicationDBContext _ctx;

    public ExpenseRepository(ApplicationDBContext context)
    {
        _ctx = context;
    }
    
    public List<Expense> FindAll()
    {
        return _ctx.Expenses
            .Include(e => e.Tricount)
            .Include(e => e.Spender)
            .Include(e => e.Recipients)
            .ToList();
    }

    public Expense? FindById(int id)
    {
        return _ctx.Expenses
            .Include(e => e.Tricount)
            .Include(e => e.Spender)
            .Include(e => e.Recipients)
            .FirstOrDefault(e => e.Id == id);
    }

    public List<Expense> FindForTricount(int tricountId)
    {
        return _ctx.Expenses
            .Include(e => e.Tricount)
            .Include(e => e.Spender)
            .Include(e => e.Recipients)
            .Where(e => e.Tricount.Id == tricountId).ToList();
    }

    public void Create(Expense expense)
    {
        _ctx.Expenses.Add(expense);
        _ctx.SaveChanges();
    }
    
    public void Delete(int id)
    {
        var expense = FindById(id);
        _ctx.Expenses.Remove(expense ?? throw new ArgumentNullException($"Expense {id} not found."));
        _ctx.SaveChanges();
    }
}