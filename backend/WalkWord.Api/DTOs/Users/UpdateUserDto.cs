using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.DTOs.Users
{
    public class UpdateUserDto
    {
        [Required, MaxLength(120)]
        public string Name { get; set; } = "";

        [Required, EmailAddress, MaxLength(180)]
        public string Email { get; set; } = "";
    }
}
