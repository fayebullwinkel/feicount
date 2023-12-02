using Microsoft.AspNetCore.Mvc;
using tricount.Controllers.Mappers;
using tricount.Data;
using tricount.Models;

namespace tricount.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TricountController: ControllerBase
{
    private readonly ITricountRepository _tricountRepository;
    private readonly ITricountMapper _tricountMapper;

    public TricountController(ITricountRepository tricountRepository, ITricountMapper tricountMapper)
    {
        _tricountRepository = tricountRepository;
        _tricountMapper = tricountMapper;
    }

    [HttpGet]
    public List<TricountDto> GetAll()
    {
        return _tricountRepository.FindAll().Select(tricount => _tricountMapper.ToTricountDto(tricount)).ToList();
    }

    [HttpGet("{id}")]
    public TricountDto? GetById(int id)
    {
        return _tricountMapper.ToTricountDto(_tricountRepository.FindById(id));
    }

    [HttpPost]
    public TricountDto Post([FromBody] TricountDto dto)
    {
        var users = new List<User>(); // TODO extract to service, call repo
        _tricountRepository.Create(_tricountMapper.ToTricount(dto));
        return dto;
    }
    
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _tricountRepository.Delete(id);
        //Response.Redirect("./");
    }
}