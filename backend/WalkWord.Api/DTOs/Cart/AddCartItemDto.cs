using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.DTOs.Cart
{
    public class AddCartItemDto
    {
        [Range(1, int.MaxValue)]
        public int ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Qty { get; set; }
    }
}
