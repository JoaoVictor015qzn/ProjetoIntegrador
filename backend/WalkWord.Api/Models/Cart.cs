namespace WalkWord.Api.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public User? User { get; set; }
        public List<CartItem> Items { get; set; } = new();
    }
}
