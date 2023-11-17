
using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}