namespace feicount.Controllers.Types;

public class ExpenseDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public int Amount { get; set; }
    public Currency Currency { get; set; }
    public DateTime Date { get; set; }
    public int SpenderUserId { get; set; }
    public List<int> RecipientIds { get; set; }
    public int? FeicountId { get; set; }
}