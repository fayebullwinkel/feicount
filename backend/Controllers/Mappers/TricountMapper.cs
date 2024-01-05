using tricount.Controllers.Types;
using tricount.Models;

namespace tricount.Controllers.Mappers;

public interface ITricountMapper
{
    public Tricount ToTricount(TricountDto dto, List<User> users, List<Expense> expenses);
    public TricountDto ToTricountDto(Tricount model);
    public Expense ToExpense(ExpenseDto dto, User spender, List<User> recipients, Tricount tricount);
    public ExpenseDto ToExpenseDto(Expense modelList);
}

public class TricountMapper: ITricountMapper
{
    public Tricount ToTricount(TricountDto dto, List<User> users, List<Expense> expenses)
    {
        return new Tricount
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            Currency = dto.Currency,
            Category = dto.Category,
            Users = users,
            Expenses = expenses
        };
    }
    
    public TricountDto ToTricountDto(Tricount model)
    {
        return new TricountDto
        {
            Id = model.Id,
            Title = model.Title,
            Description = model.Description,
            Currency = model.Currency,
            Category = model.Category,
            UserIds = model.Users.Select(user => user.Id).ToList(),
            ExpenseIds = model.Expenses.Select(expense => expense.Id).ToList()
        };
    }

    public Expense ToExpense(ExpenseDto dto, User spender, List<User> recipients, Tricount tricount)
    {
        return new Expense
        {
            Id = dto.Id,
            Title = dto.Title,
            Amount = dto.Amount,
            Date = dto.Date,
            Spender = spender,
            Recipients = recipients,
            Tricount = tricount
        };
    }
    
    public ExpenseDto ToExpenseDto(Expense model)
    {
        return new ExpenseDto
        {
            Id = model.Id,
            Title = model.Title,
            Amount = model.Amount,
            Date = model.Date,
            SpenderUserId = model.Spender.Id,
            RecipientIds = model.Recipients.Select(r => r.Id).ToList()
        };
    }
}