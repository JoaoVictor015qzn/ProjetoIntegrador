using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.Models
{
    public class CartItem
    {
        public int Id { get; set; }

        public int CartId { get; set; }
        public int ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Qty { get; set; }

        public decimal UnitPrice { get; set; }

        // Navigation
        public Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
