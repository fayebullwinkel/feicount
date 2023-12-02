using Microsoft.AspNetCore.Mvc;
using tricount.Controllers.Mappers;
using tricount.Data;
using tricount.Models;

namespace tricount.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IUserMapper _userMapper;

    public UserController(IUserRepository userRepository, IUserMapper userMapper)
    {
        _userRepository = userRepository;
        _userMapper = userMapper;
    }
    
    [HttpGet]
    public List<UserDto> GetAll()
    {
        return _userRepository.FindAll().Select(user => _userMapper.ToUserDto(user)).ToList();
    }
    
    [HttpGet("{id}")]
    public UserDto? GetById(int id)
    {
        return _userMapper.ToUserDto(_userRepository.FindById(id));
    }
    
    [HttpPost]
    public User Post(User user)
    {
        return _userRepository.Create(user);
    }
}
