using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Codereviewbot.DTOs;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    // .NET automatically passes UserManager in here
    public AccountController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        // 1. Build the user object
        var user = new AppUser
        {
            FirstName = model.FirstName,
            LastName  = model.LastName,
            Email     = model.Email,
            UserName  = model.Email   // Identity requires a UserName, we just use email
        };

        // 2. Save to database (password gets hashed automatically)
        var result = await _userManager.CreateAsync(user, model.Password);

        // 3. Check if it worked
        if (result.Succeeded)
        {
            return Ok("User registered successfully!");
        }

        // 4. If something went wrong, return the errors
        return BadRequest(result.Errors);
    }

    [HttpPost("login")]

    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if(user==null)
        {
            return BadRequest("User not found.");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user,model.Password);

        if (!isPasswordValid)
        {
            return BadRequest("Invalid password");
        }

        return Ok("Login Successful.");
    }
}