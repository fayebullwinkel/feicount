namespace feicount.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public List<Feicount> Feicounts { get; set; } = new();
    public List<Expense> Expenses { get; set; } = new();
}