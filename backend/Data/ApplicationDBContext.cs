
using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;
public class ApplicationDBContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Tricount> Tricounts { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Expense>()
            .HasOne(e => e.Spender);

        modelBuilder.Entity<Expense>()
            .HasMany(e => e.Recipients)
            .WithMany(u => u.Expenses);
    }
}