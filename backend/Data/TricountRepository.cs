using Microsoft.EntityFrameworkCore;
using tricount.Models;

namespace tricount.Data;

public interface ITricountRepository
{
    public List<Tricount> FindAll();
    public Tricount? FindById(int id);
    public Tricount Create(Tricount tricount);
    public void Delete(int id);
}

public class TricountRepository : ITricountRepository
{
    private readonly ApplicationDBContext _ctx;

    public TricountRepository(ApplicationDBContext context)
    {
        _ctx = context;
    }
    
    public List<Tricount> FindAll()
    {
        return _ctx.Tricounts
            .Include(t => t.Users)
            .ToList();
    }

    public Tricount? FindById(int id)
    {
        return _ctx.Tricounts
            .Include(t => t.Users)
            .FirstOrDefault(t => t.Id == id);
    }

    public Tricount Create(Tricount tricount)
    {
        _ctx.Tricounts.Add(tricount);
        _ctx.SaveChanges();
        return tricount;
    }

    public void Delete(int id)
    {
        var tricount = FindById(id);
        _ctx.Tricounts.Remove(tricount);
        _ctx.SaveChanges();
    }
}