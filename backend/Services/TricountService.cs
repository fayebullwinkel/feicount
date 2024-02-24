using System.Diagnostics;
using feicount.Controllers.Mappers;
using feicount.Controllers.Types;
using feicount.Data;
using feicount.Models;

namespace feicount.Services;

public interface IFeicountService
{
    public void CreateFeicount(FeicountDto dto);
    public List<Feicount> FindAll();
    public Feicount FindById(int id);
    public void Delete(int id);
    public List<Expense> GetFeicountExpenses(int id);
    public List<User> GetFeicountUsers(int id);
    public void AddExpenseToFeicount(int feicountId, ExpenseDto dto);
    public void DeleteExpense(int expenseId);
    public void DeleteFeicountUser(int feicountId, int userId);
    public void AddUserToFeicount(int feicountId, int userId);
    public List<Transaction> GetFeicountTransactions(int id);
}

public class FeicountService : IFeicountService
{
    private readonly IExpenseRepository _expenseRepository;
    private readonly IFeicountRepository _feicountRepository;
    private readonly IUserRepository _userRepository;
    private readonly IFeicountMapper _feicountMapper;

    public FeicountService(IExpenseRepository expenseRepository, IFeicountRepository feicountRepository,
        IUserRepository userRepository, IFeicountMapper feicountMapper)
    {
        _expenseRepository = expenseRepository;
        _feicountRepository = feicountRepository;
        _userRepository = userRepository;
        _feicountMapper = feicountMapper;
    }

    public void CreateFeicount(FeicountDto dto)
    {
        var users = dto.UserNames.Select(userName => _userRepository.FindByNameOrCreate(userName)).ToList();
        var expenses = dto.ExpenseIds.Select(expenseId => _expenseRepository.FindById(expenseId)).ToList();

        if (expenses.Any(e => e == null))
        {
            throw new ArgumentNullException($"One or more {expenses} not found.");
        }

        var feicount = _feicountMapper.ToFeicount(dto, users, expenses!);
        _feicountRepository.Create(feicount);
    }

    public List<Expense> GetFeicountExpenses(int id)
    {
        return _expenseRepository.FindForFeicount(id);
    }
    
    public List<User> GetFeicountUsers(int id)
    {
        return _feicountRepository.GetUsers(id);
    }

    public List<Feicount> FindAll()
    {
        return _feicountRepository.FindAll();
    }

    public Feicount FindById(int id)
    {
        return _feicountRepository.FindById(id) ?? throw new InvalidOperationException();
    }

    public void Delete(int id)
    {
        _feicountRepository.Delete(id);
    }

    public void AddExpenseToFeicount(int feicountId, ExpenseDto dto)
    {
        var feicount = _feicountRepository.FindById(feicountId);
        var spender = _userRepository.FindById(dto.SpenderUserId);
        var recipients = dto.RecipientIds.Select(recipientId => _userRepository.FindById(recipientId)).ToList();

        if (feicount == null)
        {
            throw new ArgumentNullException($"{feicount} not found.");
        }

        if (spender == null)
        {
            throw new ArgumentNullException($"{spender} not found.");
        }

        if (recipients.Any(r => r == null))
        {
            throw new ArgumentNullException($"One or more {recipients} not found.");
        }

        var expense = _feicountMapper.ToExpense(dto, spender, recipients!, feicount);
        _expenseRepository.Create(expense);
        _feicountRepository.AddExpenseToFeicount(feicount, expense);
    }

    public void DeleteExpense(int expenseId)
    {
        _expenseRepository.Delete(expenseId);
    }

    public void AddUserToFeicount(int feicountId, int userId)
    {
        var feicount = _feicountRepository.FindById(feicountId);
        var user = _userRepository.FindById(userId);

        if (feicount == null)
        {
            throw new ArgumentNullException($"{feicount} not found.");
        }

        _feicountRepository.AddUserToFeicount(feicount, user);
    }

    public void DeleteFeicountUser(int feicountId, int userId)
    {
        var feicount = FindById(feicountId);
        var user = _userRepository.FindById(userId);

        if (feicount == null)
        {
            throw new ArgumentNullException($"{feicount} not found.");
        }

        if (user == null)
        {
            throw new ArgumentNullException($"{user} not found.");
        }

        if (user.Expenses.Count != 0)
        {
            DistributeRemainingUserExpenses(feicount, user);
        }

        _feicountRepository.DeleteFeicountUser(feicount, user!);
    }

    public void DistributeRemainingUserExpenses(Feicount feicount, User userToDelete)
    {
        var users = feicount.Users.Where(user => user.Id != userToDelete.Id);

        foreach (var expense in userToDelete.Expenses)
        {
            expense.Recipients.Remove(userToDelete);
            expense.Recipients.AddRange(users);
        }
    }

    public List<Transaction> GetFeicountTransactions(int id)
    {
        var feicount = _feicountRepository.FindById(id);
        return feicount.CalculateTransactions();
    }
}