using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;

public interface IExpenseRepository
{
    public List<Expense> FindAll();
    public Expense? FindById(int id);
    public List<Expense> FindForTricount(int tricountId);
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
}