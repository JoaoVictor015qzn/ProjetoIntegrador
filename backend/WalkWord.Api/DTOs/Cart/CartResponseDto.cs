namespace WalkWord.Api.DTOs.Cart
{
    public class CartResponseDto
    {
        public int UserId { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<CartItemView> Items { get; set; } = new();
        public decimal Total { get; set; }

        public class CartItemView
        {
            public int ProductId { get; set; }
            public string ProductName { get; set; } = "";
            public int Qty { get; set; }
            public decimal UnitPrice { get; set; }
            public decimal LineTotal { get; set; }
        }
    }
}
