namespace WalkWord.Api.DTOs.Orders
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ItemsJson { get; set; } = "";
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
