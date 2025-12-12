using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WalkWord.Api.DTOs.Cart;
using WalkWord.Api.Services;

namespace WalkWord.Api.Controllers
{
    [ApiController]
    [Route("api/cart")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly CartService _cart;
        public CartController(CartService cart) => _cart = cart;

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _cart.GetCartAsync(UserId));

        [HttpPost("items")]
        public async Task<IActionResult> AddItem([FromBody] AddCartItemDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                return Ok(await _cart.AddItemAsync(UserId, dto));
            }
            catch (Exception ex) when (ex is InvalidOperationException || ex is KeyNotFoundException)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("items/{productId:int}")]
        public async Task<IActionResult> UpdateQty(int productId, [FromBody] UpdateCartItemQtyDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                return Ok(await _cart.UpdateQtyAsync(UserId, productId, dto.Qty));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("items/{productId:int}")]
        public async Task<IActionResult> RemoveItem(int productId)
        {
            try
            {
                return Ok(await _cart.RemoveItemAsync(UserId, productId));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Clear() => Ok(await _cart.ClearAsync(UserId));
    }
}
