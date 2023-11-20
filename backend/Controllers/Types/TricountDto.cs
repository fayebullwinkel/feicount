namespace tricount.Models;

public class TricountDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Currency? Currency { get; set; }
    public Category? Category { get; set; }
}