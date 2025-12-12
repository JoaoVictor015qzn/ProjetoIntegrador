using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(120)]
        public string Name { get; set; } = "";

        [Required, MaxLength(180), EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string PasswordHash { get; set; } = "";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public Cart? Cart { get; set; }
    }
}
