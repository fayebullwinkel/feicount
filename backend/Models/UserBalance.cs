namespace feicount.Models;

public class UserBalance(int userId, int amount)
{
    public int UserId { get; set; } = userId;
    public int Amount { get; set; } = amount;
}