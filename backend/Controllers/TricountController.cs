using Microsoft.AspNetCore.Mvc;
using tricount.Controllers.Mappers;
using tricount.Controllers.Types;
using tricount.Models;
using tricount.Services;

namespace tricount.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TricountController: ControllerBase
{
    private readonly ITricountMapper _tricountMapper;
    private readonly ITricountService _tricountService;

    public TricountController(ITricountMapper tricountMapper, ITricountService tricountService)
    {
        _tricountMapper = tricountMapper;
        _tricountService = tricountService;
    }

    [HttpGet]
    public List<TricountDto> GetAll()
    {
        return _tricountService.FindAll().Select(tricount => _tricountMapper.ToTricountDto(tricount)).ToList();
    }

    [HttpGet("{id}/Transactions")]
    public List<Transaction> GetTricountTransactions(int id)
    {
        return _tricountService.GetTricountTransactions(id);
    }

    [HttpGet("{id}")]
    public TricountDto GetById(int id)
    {
        return _tricountMapper.ToTricountDto(_tricountService.FindById(id));
    }

    [HttpGet("{id}/Expenses")]
    public List<ExpenseDto> GetExpenses(int id)
    {
        return _tricountService.GetTricountExpenses(id).Select(expense => _tricountMapper.ToExpenseDto(expense)).ToList();
    }
    
    [HttpPost("{id}/Users/{userId}")]
    public void AddUser(int id, int userId)
    {
        _tricountService.AddUserToTricount(id, userId);
    }

    [HttpPost]
    public void Post([FromBody] TricountDto dto)
    {
        _tricountService.CreateTricount(dto);
    }

    [HttpPost("{id}/Expenses")]
    public void AddExpense(int id, [FromBody] ExpenseDto dto)
    {
        _tricountService.AddExpenseToTricount(id, dto);
    }
    
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _tricountService.Delete(id);
    }

    [HttpDelete("{id}/Expenses/{expenseId}")]
    public void DeleteExpense(int expenseId)
    {
        _tricountService.DeleteExpense(expenseId);
    }

    [HttpDelete("{id}/Users/{userId}")]
    public void DeleteTricountUser(int id, int userId)
    {
        _tricountService.DeleteTricountUser(id, userId);
    }
}