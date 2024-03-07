using Microsoft.AspNetCore.Mvc;
using feicount.Controllers.Mappers;
using feicount.Controllers.Types;
using feicount.Models;
using feicount.Services;

namespace feicount.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeicountController : ControllerBase
{
    private readonly IFeicountMapper _feicountMapper;
    private readonly IUserMapper _userMapper;
    private readonly IFeicountService _feicountService;

    public FeicountController(IFeicountMapper feicountMapper, IUserMapper userMapper, IFeicountService feicountService)
    {
        _feicountMapper = feicountMapper;
        _userMapper = userMapper;
        _feicountService = feicountService;
    }

    [HttpGet]
    public List<FeicountDto> GetAll()
    {
        return _feicountService.FindAll().Select(feicount => _feicountMapper.ToFeicountDto(feicount)).ToList();
    }

    [HttpGet("{id}/Transactions")]
    public List<Transaction> GetFeicountTransactions(int id)
    {
        return _feicountService.GetFeicountTransactions(id);
    }

    [HttpGet("{id}")]
    public FeicountDto GetById(int id)
    {
        return _feicountMapper.ToFeicountDto(_feicountService.FindById(id));
    }

    [HttpGet("{id}/Expenses")]
    public List<ExpenseDto> GetExpenses(int id)
    {
        return _feicountService.GetFeicountExpenses(id).Select(expense => _feicountMapper.ToExpenseDto(expense))
            .ToList();
    }

    [HttpGet("{id}/Users")]
    public List<UserDto> GetUsers(int id)
    {
        return _feicountService.GetFeicountUsers(id).Select(user => _userMapper.ToUserDto(user)).ToList();
    }

    [HttpPost("{id}/Users/{userId}")]
    public void AddUser(int id, int userId)
    {
        _feicountService.AddUserToFeicount(id, userId);
    }

    [HttpPost("{id}/Transactions/{transactionId}/Pay")]
    public void PayTransaction(int id, [FromBody] Transaction transaction)
    {
        _feicountService.PayTransaction(id, transaction);
    }

    [HttpGet("{id}/Users/{userId}/Balance")]
    public UserBalance GetUserBalance(int id, int userId)
    {
        return _feicountService.GetUserBalance(id, userId);
    }

    [HttpPost]
    public void Post([FromBody] FeicountDto dto)
    {
        _feicountService.CreateFeicount(dto);
    }

    [HttpPost("{id}/Expenses")]
    public void AddExpense(int id, [FromBody] ExpenseDto dto)
    {
        _feicountService.AddExpenseToFeicount(id, dto);
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _feicountService.Delete(id);
    }

    [HttpDelete("{id}/Expenses/{expenseId}")]
    public void DeleteExpense(int expenseId)
    {
        _feicountService.DeleteExpense(expenseId);
    }

    [HttpDelete("{id}/Users/{userId}")]
    public void DeleteFeicountUser(int id, int userId)
    {
        _feicountService.DeleteFeicountUser(id, userId);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateFeicount(int id, [FromBody] FeicountDto updatedFeicountDto)
    {
        try
        {
            _feicountService.UpdateFeicount(id, updatedFeicountDto);

            return Ok($"Feicount with id {id} updated successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }
}