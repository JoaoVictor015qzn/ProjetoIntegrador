using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WalkWord.Api.DTOs.Products;
using WalkWord.Api.Services;

namespace WalkWord.Api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _products;
        public ProductsController(ProductService products) => _products = products;

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool? active = null)
            => Ok(await _products.GetAllAsync(active));

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var p = await _products.GetByIdAsync(id);
            return p is null ? NotFound() : Ok(p);
        }

        // Se quiser proteger: [Authorize]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var p = await _products.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var ok = await _products.UpdateAsync(id, dto);
            return ok ? NoContent() : NotFound();
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _products.DeleteAsync(id);
            return ok ? NoContent() : NotFound();
        }
    }
}
