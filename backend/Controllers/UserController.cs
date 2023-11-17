using Microsoft.AspNetCore.Mvc;
using tricount.Data;
using tricount.Models;

namespace tricount.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    [HttpGet]
    public List<User> GetAll()
    {
        return _userRepository.FindAll();
    }
    
    [HttpGet("{id}")]
    public User? GetById(int id)
    {
        return _userRepository.FindById(id);
    }
    
    [HttpPost]
    public User Post(User user)
    {
        return _userRepository.Create(user);
    }
}
