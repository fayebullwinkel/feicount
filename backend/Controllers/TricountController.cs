using Microsoft.AspNetCore.Mvc;
using tricount.Data;
using tricount.Models;

namespace tricount.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TricountController: ControllerBase
{
    private readonly ITricountRepository _tricountRepository;

    public TricountController(ITricountRepository tricountRepository)
    {
        _tricountRepository = tricountRepository;
    }

    [HttpGet]
    public List<Tricount> GetAll()
    {
        return _tricountRepository.FindAll();
    }

    [HttpGet("{id}")]
    public Tricount? GetById(int id)
    {
        return _tricountRepository.FindById(id);
    }

    [HttpPost]
    public TricountDto Post([FromBody] TricountDto dto)
    {
        _tricountRepository.Create(mapTricountDto(dto));
        return dto;
    }

    private Tricount mapTricountDto(TricountDto dto)
    {
        var users = new List<User>(); // TODO extract to service, call repo
        return new Tricount
        {
            Id = dto.Id,
            Title = dto.Title,
            Description = dto.Description,
            Currency = dto.Currency,
            Category = dto.Category,
        };
    }
    
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _tricountRepository.Delete(id);
        //Response.Redirect("./");
    }
}