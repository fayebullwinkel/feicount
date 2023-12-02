namespace tricount.Models;

public class Expense
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Amount { get; set; }
    public DateTime Date { get; set; }
    public int SpenderUserId { get; set; }
    public List<User> Recipients { get; set; } = new();
    public Tricount Tricount { get; set; }
}