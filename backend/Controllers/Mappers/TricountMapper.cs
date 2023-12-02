using tricount.Models;

namespace tricount.Controllers.Mappers;

public interface ITricountMapper
{
    public Tricount ToTricount(TricountDto dto);
    public TricountDto ToTricountDto(Tricount model);
    public ExpenseDto ToExpenseDto(Expense model);
}

public class TricountMapper: ITricountMapper
{
    public Tricount ToTricount(TricountDto dto)
    {
        return new Tricount
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            Currency = dto.Currency,
            Category = dto.Category
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
            UserIds = model.Users.Select(user => user.Id).ToList()
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
            SpenderUserId = model.SpenderUserId,
            RecipientIds = model.Recipients.Select(r => r.Id).ToList(),
            TricountId = model.Tricount.Id
        };
    }
}