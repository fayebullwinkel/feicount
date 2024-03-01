using System.Diagnostics;using feicount.Controllers.Mappers;using feicount.Controllers.Types;using feicount.Data;using feicount.Models;using Microsoft.AspNetCore.Components.Web;namespace feicount.Services;public interface IFeicountService{    public void CreateFeicount(FeicountDto dto);    public List<Feicount> FindAll();    public Feicount FindById(int id);    public void Delete(int id);    public List<Expense> GetFeicountExpenses(int id);    public List<User> GetFeicountUsers(int id);    public List<Transaction> GetFeicountTransactions(int id);    public UserBalance GetUserBalance(int id, int userId);    public void AddExpenseToFeicount(int feicountId, ExpenseDto dto);    public void DeleteExpense(int expenseId);    public void DeleteFeicountUser(int feicountId, int userId);    public void AddUserToFeicount(int feicountId, int userId);    public void PayTransaction(int feicountId, Transaction transaction);    public void UpdateFeicount(int id, FeicountDto updatedFeicount);}public class FeicountService : IFeicountService{    private readonly IExpenseRepository _expenseRepository;    private readonly IFeicountRepository _feicountRepository;    private readonly IUserRepository _userRepository;    private readonly IFeicountMapper _feicountMapper;    public FeicountService(IExpenseRepository expenseRepository, IFeicountRepository feicountRepository,        IUserRepository userRepository, IFeicountMapper feicountMapper)    {        _expenseRepository = expenseRepository;        _feicountRepository = feicountRepository;        _userRepository = userRepository;        _feicountMapper = feicountMapper;    }    public void CreateFeicount(FeicountDto dto)    {        var users = dto.UserNames.Select(userName => _userRepository.FindByNameOrCreate(userName)).ToList();        var expenses = dto.ExpenseIds.Select(expenseId => _expenseRepository.FindById(expenseId)).ToList();        if (expenses.Any(e => e == null))        {            throw new ArgumentNullException($"One or more {expenses} not found.");        }        var feicount = _feicountMapper.ToFeicount(dto, users, expenses!);        _feicountRepository.Create(feicount);    }    public List<Expense> GetFeicountExpenses(int id)    {        return _expenseRepository.FindForFeicount(id);    }    public List<User> GetFeicountUsers(int id)    {        return _feicountRepository.GetUsers(id);    }    public List<Transaction> GetFeicountTransactions(int id)    {        var feicount = _feicountRepository.FindById(id);        return feicount.CalculateTransactions();    }    public UserBalance GetUserBalance(int id, int userId)    {        var feicount = _feicountRepository.FindById(id);        var user = feicount?.Users.FirstOrDefault(u => u.Id == userId);        return feicount?.CalculateUserBalance(user);    }    public List<Feicount> FindAll()    {        return _feicountRepository.FindAll();    }    public Feicount FindById(int id)    {        return _feicountRepository.FindById(id) ?? throw new InvalidOperationException();    }    public void Delete(int id)    {        _feicountRepository.Delete(id);    }    public void AddExpenseToFeicount(int feicountId, ExpenseDto dto)    {        var feicount = _feicountRepository.FindById(feicountId);        var spender = _userRepository.FindById(dto.SpenderUserId);        var recipients = dto.RecipientIds.Select(recipientId => _userRepository.FindById(recipientId)).ToList();        if (feicount == null)        {            throw new ArgumentNullException($"{feicount} not found.");        }        if (spender == null)        {            throw new ArgumentNullException($"{spender} not found.");        }        if (recipients.Any(r => r == null))        {            throw new ArgumentNullException($"One or more {recipients} not found.");        }        var expense = _feicountMapper.ToExpense(dto, spender, recipients!, feicount);        _expenseRepository.Create(expense);        _feicountRepository.AddExpenseToFeicount(feicount, expense);    }    public void DeleteExpense(int expenseId)    {        _expenseRepository.Delete(expenseId);    }    public void AddUserToFeicount(int feicountId, int userId)    {        var feicount = _feicountRepository.FindById(feicountId);        var user = _userRepository.FindById(userId);        if (feicount == null)        {            throw new ArgumentNullException($"{feicount} not found.");        }        _feicountRepository.AddUserToFeicount(feicount, user);    }    public void PayTransaction(int feicountId, Transaction transaction)    {        var feicount = _feicountRepository.FindById(feicountId);        var deptor = _userRepository.FindById(transaction.DebtorId);        var creditor = _userRepository.FindById(transaction.CreditorId);        var expense = new Expense        {            Id = 0,            Title = $"Rückzahlung von {deptor.UserName} an {creditor.UserName}",            Amount = transaction.Amount,            Currency = Currency.EUR,            Date = DateTime.UtcNow.Date,            Spender = deptor,            Recipients = new List<User> { creditor },            Feicount = feicount        };        _expenseRepository.Create(expense);        _feicountRepository.AddExpenseToFeicount(feicount, expense);    }    public void DeleteFeicountUser(int feicountId, int userId)    {        var feicount = FindById(feicountId);        var user = _userRepository.FindById(userId);        if (feicount == null)        {            throw new ArgumentNullException($"{feicount} not found.");        }        if (user == null)        {            throw new ArgumentNullException($"{user} not found.");        }        if (user.Expenses.Count != 0)        {            DistributeRemainingUserExpenses(feicount, user);        }        _feicountRepository.DeleteFeicountUser(feicount, user!);    }    public void DistributeRemainingUserExpenses(Feicount feicount, User userToDelete)    {        var users = feicount.Users.Where(user => user.Id != userToDelete.Id);        foreach (var expense in userToDelete.Expenses)        {            expense.Recipients.Remove(userToDelete);            expense.Recipients.AddRange(users);        }    }    public void UpdateFeicount(int id, FeicountDto updatedFeicount)    {        var feicount = FindById(id);        if (feicount.Id != updatedFeicount.Id)        {            throw new InvalidOperationException(                $"Updated with id {updatedFeicount.Id} does not match Feicount with id {id}.");        }        var updatedUsers = updatedFeicount.UserNames!            .Select(userName => _userRepository.FindByNameOrCreate(userName))            .Concat(updatedFeicount.UserIds!.Select(userId => _userRepository.FindById(userId)))            .ToList();        var updatedExpenses = updatedFeicount.ExpenseIds!            .Select(expenseId => _expenseRepository.FindById(expenseId))            .ToList();        feicount.Title = updatedFeicount.Title;        feicount.Currency = updatedFeicount.Currency;        feicount.Category = updatedFeicount.Category;        if (!string.IsNullOrEmpty(updatedFeicount.Description))        {            feicount.Description = updatedFeicount.Description;        }        feicount.Users = updatedUsers!;        feicount.Expenses = updatedExpenses!;        _feicountRepository.UpdateFeicount(feicount);    }}