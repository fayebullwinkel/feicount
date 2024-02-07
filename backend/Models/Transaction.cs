namespace tricount.Models;

public class Transaction(int debtorId, int creditorId, int amount)
{
    public int DebtorId { get; set; } = debtorId;
    public int CreditorId { get; set; } = creditorId;
    public int Amount { get; set; } = amount;
}

