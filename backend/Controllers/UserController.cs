using Microsoft.AspNetCore.Mvc;
using feicount.Controllers.Mappers;
using feicount.Controllers.Types;
using feicount.Models;
using feicount.Services;

namespace feicount.Controllers;

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
        _userService.CreateUser(dto);
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        _userService.Delete(id);
    }
}
