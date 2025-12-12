using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.DTOs.Auth
{
    public class RegisterRequestDto
    {
        [Required, MaxLength(120)]
        public string Name { get; set; } = "";

        [Required, EmailAddress, MaxLength(180)]
        public string Email { get; set; } = "";

        [Required, MinLength(6), MaxLength(64)]
        public string Password { get; set; } = "";
    }
}
