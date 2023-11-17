using System.ComponentModel.DataAnnotations.Schema;

namespace tricount.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}