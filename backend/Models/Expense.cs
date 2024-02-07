namespace tricount.Models;

public class Expense
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int Amount { get; set; } // always state amounts in cent 
    // TODO: custom amount per person
    public DateTime Date { get; set; }
    public User Spender { get; set; }
    public List<User> Recipients { get; set; } = new();
    public Tricount Tricount { get; set; }
}