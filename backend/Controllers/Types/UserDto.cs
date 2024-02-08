namespace tricount.Controllers.Types;

public class UserDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public string LastName { get; set; }
    public List<int>? TricountIds { get; set; }
    public List<int>? ExpenseIds { get; set; }
}