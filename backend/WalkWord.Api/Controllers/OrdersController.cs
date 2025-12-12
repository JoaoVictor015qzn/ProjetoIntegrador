using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WalkWord.Api.Services;

namespace WalkWord.Api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orders;
        public OrdersController(OrderService orders) => _orders = orders;

        private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            try
            {
                var order = await _orders.CheckoutAsync(UserId);
                return Created("", order);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("mine")]
        public async Task<IActionResult> MyOrders()
            => Ok(await _orders.GetMyOrdersAsync(UserId));
    }
}
