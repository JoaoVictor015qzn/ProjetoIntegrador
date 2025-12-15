using System.ComponentModel.DataAnnotations;

namespace WalkWord.Api.DTOs.Cart
{
    public class UpdateCartItemQtyDto
    {
        [Range(0, int.MaxValue)]
        public int Qty { get; set; }
    }
}
