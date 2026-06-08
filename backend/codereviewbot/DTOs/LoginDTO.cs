using System.ComponentModel.DataAnnotations;

namespace Codereviewbot.DTOs
{
    public class LoginDto
{
    [Required(ErrorMessage ="Email is Required!")]
    [EmailAddress]
    public string Email {get; set;} = string.Empty;

    [Required(ErrorMessage ="Password is required!")]
    public string Password {get; set;} = string.Empty;
}
}