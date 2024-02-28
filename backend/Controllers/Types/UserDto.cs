namespace feicount.Controllers.Types;

public class UserDto
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public List<int>? FeicountIds { get; set; }
    public List<int>? ExpenseIds { get; set; }
}