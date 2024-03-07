using feicount.Controllers.Types;
using feicount.Models;

namespace feicount.Controllers.Mappers;

public interface IFeicountMapper
{
    public Feicount ToFeicount(FeicountDto dto, List<User> users, List<Expense> expenses);
    public FeicountDto ToFeicountDto(Feicount model);
    public Expense ToExpense(ExpenseDto dto, User spender, List<User> recipients, Feicount feicount);
    public ExpenseDto ToExpenseDto(Expense model);
}

public class FeicountMapper: IFeicountMapper
{
    public Feicount ToFeicount(FeicountDto dto, List<User> users, List<Expense> expenses)
    {
        return new Feicount
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
    
    public FeicountDto ToFeicountDto(Feicount model)
    {
        return new FeicountDto
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

    public Expense ToExpense(ExpenseDto dto, User spender, List<User> recipients, Feicount feicount)
    {
        return new Expense
        {
            Id = dto.Id,
            Title = dto.Title,
            Amount = dto.Amount,
            Date = dto.Date,
            Spender = spender,
            Recipients = recipients,
            Feicount = feicount
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