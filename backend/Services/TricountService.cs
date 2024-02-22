using System.Diagnostics;
using tricount.Controllers.Mappers;
using tricount.Controllers.Types;
using tricount.Data;
using tricount.Models;

namespace tricount.Services;

public interface ITricountService
{
    public void CreateTricount(TricountDto dto);
    public List<Tricount> FindAll();
    public Tricount FindById(int id);
    public void Delete(int id);
    public List<Expense> GetTricountExpenses(int id);
    public List<User> GetTricountUsers(int id);
    public void AddExpenseToTricount(int tricountId, ExpenseDto dto);
    public void DeleteExpense(int expenseId);
    public void DeleteTricountUser(int tricountId, int userId);
    public void AddUserToTricount(int tricountId, int userId);
    public List<Transaction> GetTricountTransactions(int id);
}

public class TricountService : ITricountService
{
    private readonly IExpenseRepository _expenseRepository;
    private readonly ITricountRepository _tricountRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITricountMapper _tricountMapper;

    public TricountService(IExpenseRepository expenseRepository, ITricountRepository tricountRepository,
        IUserRepository userRepository, ITricountMapper tricountMapper)
    {
        _expenseRepository = expenseRepository;
        _tricountRepository = tricountRepository;
        _userRepository = userRepository;
        _tricountMapper = tricountMapper;
    }

    public void CreateTricount(TricountDto dto)
    {
        var users = dto.UserNames.Select(userName => _userRepository.FindByNameOrCreate(userName)).ToList();
        var expenses = dto.ExpenseIds.Select(expenseId => _expenseRepository.FindById(expenseId)).ToList();

        if (expenses.Any(e => e == null))
        {
            throw new ArgumentNullException($"One or more {expenses} not found.");
        }

        var tricount = _tricountMapper.ToTricount(dto, users, expenses!);
        _tricountRepository.Create(tricount);
    }

    public List<Expense> GetTricountExpenses(int id)
    {
        return _expenseRepository.FindForTricount(id);
    }
    
    public List<User> GetTricountUsers(int id)
    {
        return _tricountRepository.GetUsers(id);
    }

    public List<Tricount> FindAll()
    {
        return _tricountRepository.FindAll();
    }

    public Tricount FindById(int id)
    {
        return _tricountRepository.FindById(id) ?? throw new InvalidOperationException();
    }

    public void Delete(int id)
    {
        _tricountRepository.Delete(id);
    }

    public void AddExpenseToTricount(int tricountId, ExpenseDto dto)
    {
        var tricount = _tricountRepository.FindById(tricountId);
        var spender = _userRepository.FindById(dto.SpenderUserId);
        var recipients = dto.RecipientIds.Select(recipientId => _userRepository.FindById(recipientId)).ToList();

        if (tricount == null)
        {
            throw new ArgumentNullException($"{tricount} not found.");
        }

        if (spender == null)
        {
            throw new ArgumentNullException($"{spender} not found.");
        }

        if (recipients.Any(r => r == null))
        {
            throw new ArgumentNullException($"One or more {recipients} not found.");
        }

        var expense = _tricountMapper.ToExpense(dto, spender, recipients!, tricount);
        _expenseRepository.Create(expense);
        _tricountRepository.AddExpenseToTricount(tricount, expense);
    }

    public void DeleteExpense(int expenseId)
    {
        _expenseRepository.Delete(expenseId);
    }

    public void AddUserToTricount(int tricountId, int userId)
    {
        var tricount = _tricountRepository.FindById(tricountId);
        var user = _userRepository.FindById(userId);

        if (tricount == null)
        {
            throw new ArgumentNullException($"{tricount} not found.");
        }

        _tricountRepository.AddUserToTricount(tricount, user);
    }

    public void DeleteTricountUser(int tricountId, int userId)
    {
        var tricount = FindById(tricountId);
        var user = _userRepository.FindById(userId);

        if (tricount == null)
        {
            throw new ArgumentNullException($"{tricount} not found.");
        }

        if (user == null)
        {
            throw new ArgumentNullException($"{user} not found.");
        }

        if (user.Expenses.Count != 0)
        {
            DistributeRemainingUserExpenses(tricount, user);
        }

        _tricountRepository.DeleteTricountUser(tricount, user!);
    }

    public void DistributeRemainingUserExpenses(Tricount tricount, User userToDelete)
    {
        var users = tricount.Users.Where(user => user.Id != userToDelete.Id);

        foreach (var expense in userToDelete.Expenses)
        {
            expense.Recipients.Remove(userToDelete);
            expense.Recipients.AddRange(users);
        }
    }

    public List<Transaction> GetTricountTransactions(int id)
    {
        var tricount = _tricountRepository.FindById(id);
        return tricount.CalculateTransactions();
    }
}