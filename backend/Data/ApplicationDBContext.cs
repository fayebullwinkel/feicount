
using Microsoft.EntityFrameworkCore;
using feicount.Models;

namespace feicount.Data;
public class ApplicationDBContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Feicount> Feicounts { get; set; }
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