
using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;
public class ApplicationDBContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Tricount> Tricounts { get; set; }
    
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) {}
}