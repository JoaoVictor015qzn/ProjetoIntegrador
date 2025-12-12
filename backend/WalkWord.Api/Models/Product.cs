using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(140)]
        public string Name { get; set; } = "";

        [MaxLength(1000)]
        public string Description { get; set; } = "";

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        public bool Active { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
