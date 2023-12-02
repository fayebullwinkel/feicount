using Microsoft.AspNetCore.Mvc;
using tricount.Controllers.Mappers;
using tricount.Data;
using tricount.Models;
using tricount.Services;

namespace tricount.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TricountController: ControllerBase
{
    private readonly ITricountMapper _tricountMapper;
    private readonly ITricountService _tricountService;

    public TricountController(ITricountMapper tricountMapper, ITricountService tricountService)
    {
        _tricountMapper = tricountMapper;
        _tricountService = tricountService;
    }

    [HttpGet]
    public List<TricountDto> GetAll()
    {
        return _tricountService.FindAll().Select(tricount => _tricountMapper.ToTricountDto(tricount)).ToList();
    }

    [HttpGet("{id}")]
    public TricountDto? GetById(int id)
    {
        return _tricountMapper.ToTricountDto(_tricountService.FindById(id));
    }

    [HttpPost]
    public void Post([FromBody] TricountDto dto)
    {
        var tricount = _tricountMapper.ToTricount(dto);
        _tricountService.CreateTricount(dto.UserIds, tricount);
    }
    
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _tricountService.Delete(id);
    }
}