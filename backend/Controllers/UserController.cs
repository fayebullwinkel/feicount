using Microsoft.AspNetCore.Mvc;
using tricount.Controllers.Mappers;
using tricount.Data;
using tricount.Models;
using tricount.Services;

namespace tricount.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IUserMapper _userMapper;

    public UserController(IUserService userService, IUserMapper userMapper)
    {
        _userService = userService;
        _userMapper = userMapper;
    }
    
    [HttpGet]
    public List<UserDto> GetAll()
    {
        return _userService.FindAll().Select(user => _userMapper.ToUserDto(user)).ToList();
    }
    
    [HttpGet("{id}")]
    public UserDto? GetById(int id)
    {
        return _userMapper.ToUserDto(_userService.FindById(id));
    }
    
    [HttpPost]
    public void Post([FromBody] UserDto dto)
    {
        var user = _userMapper.ToUser(dto);
        _userService.CreateUser(dto.TricountIds, user);
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _userService.Delete(id);
    }
}
