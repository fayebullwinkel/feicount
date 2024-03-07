using feicount.Controllers.Types;

namespace feicount.Models;

public class FeicountDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Currency Currency { get; set; }
    public Category Category { get; set; }
    public List<int>? UserIds { get; set; }
    public List<string>? UserNames { get; set; }
    public List<int>? ExpenseIds { get; set; }
}