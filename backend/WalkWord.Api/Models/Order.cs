namespace WalkWord.Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public string ItemsJson { get; set; } = ""; // snapshot do carrinho no momento da compra
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
