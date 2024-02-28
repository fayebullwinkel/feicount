namespace feicount.Models;

public class Transaction(int debtorId, int creditorId, int amount)
{
    private static int counter = 1;
    public int Id { get; set; } = GenerateUniqueId();
    public int DebtorId { get; set; } = debtorId;
    public int CreditorId { get; set; } = creditorId;
    public int Amount { get; set; } = amount;

    private static int GenerateUniqueId()
    {
        return counter++;
    }
}

