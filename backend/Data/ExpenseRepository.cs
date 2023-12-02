using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;

public interface IExpenseRepository
{
    public List<Expense> FindAll();
    public Expense? FindById(int id);
    public List<Expense> FindForTricount(int tricountId);
    public Expense Create(Expense expense);
    public void Delete(int id);
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
            .ToList();
    }

    public Expense? FindById(int id)
    {
        return _ctx.Expenses
            .Include(e => e.Tricount)
            .FirstOrDefault(e => e.Id == id);
    }

    public List<Expense> FindForTricount(int tricountId)
    {
        return _ctx.Expenses
            .Include(e => e.Tricount)
            .Include(e => e.Recipients)
            .Where(e => e.Tricount.Id == tricountId).ToList();
    }

    public Expense Create(Expense expense)
    {
        _ctx.Expenses.Add(expense);
        _ctx.SaveChanges();
        return expense;
    }

    public void Delete(int id)
    {
        var expense = FindById(id);
        _ctx.Expenses.Remove(expense);
        _ctx.SaveChanges();
    }
}