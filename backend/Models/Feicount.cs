namespace feicount.Models;

public class Feicount
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Currency Currency { get; set; }
    public Category Category { get; set; }
    public List<User> Users { get; set; } = new();
    public List<Expense> Expenses { get; set; } = new();

    public UserBalance CalculateUserBalance(User user)
    {
        var totalSpent = Expenses.Where(e => e.Spender.Id == user.Id).Sum(e => e.Amount);
        var totalReceived = Expenses
            .Where(e => e.Recipients.Contains(user))
            .Sum(e => e.Amount /
                      e.Recipients.Count); // TODO: hier wird abgerundet -> es darf nicht für jeden abgerundet werden
        return new UserBalance(userId: user.Id, amount: totalSpent - totalReceived);
    }

    public List<Transaction> CalculateTransactions()
    {
        List<Transaction> transactions = new List<Transaction>();

        foreach (var user in Users)
        {
            var totalAmount = CalculateUserBalance(user).Amount;
            switch (totalAmount)
            {
                case > 0:
                    // Creditor
                    transactions.Add(new Transaction(0, user.Id, totalAmount));
                    break;
                case < 0:
                    // Debtor 
                    transactions.Add(new Transaction(user.Id, 0, totalAmount));
                    break;
            }
        }

        var creditors = transactions.Where(t => t.DebtorId == 0).OrderByDescending(t => t.Amount).ToList();
        var debtors = transactions.Where(t => t.CreditorId == 0).OrderBy(t => t.Amount).ToList();

        foreach (var creditor in creditors)
        {
            foreach (var debtor in debtors)
            {
                if (creditor.Amount <= 0 || debtor.Amount >= 0) continue;
                var transferAmount = Math.Min(creditor.Amount, -debtor.Amount);

                transactions.Add(new Transaction(debtor.DebtorId, creditor.CreditorId, transferAmount));
                creditor.Amount -= transferAmount;
                debtor.Amount -= transferAmount;
            }
        }

        return transactions.Where(t => t.CreditorId != 0 && t.DebtorId != 0).ToList();
    }
}