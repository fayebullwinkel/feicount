namespace feicount.Models;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public List<Feicount> Feicounts { get; set; } = new();
    public List<Expense> Expenses { get; set; } = new();
}