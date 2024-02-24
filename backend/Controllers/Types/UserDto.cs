namespace feicount.Controllers.Types;

public class UserDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public string LastName { get; set; }
    public List<int>? FeicountIds { get; set; }
    public List<int>? ExpenseIds { get; set; }
}