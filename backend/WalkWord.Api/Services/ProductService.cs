using Microsoft.EntityFrameworkCore;
using WalkWord.Api.Data;
using WalkWord.Api.DTOs.Products;
using WalkWord.Api.Models;

namespace WalkWord.Api.Services
{
    public class ProductService
    {
        private readonly AppDbContext _db;
        public ProductService(AppDbContext db) => _db = db;

        public async Task<List<ProductResponseDto>> GetAllAsync(bool? active = null)
        {
            var q = _db.Products.AsNoTracking().AsQueryable();
            if (active.HasValue) q = q.Where(p => p.Active == active.Value);

            return await q.OrderByDescending(p => p.Id)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Stock = p.Stock,
                    Active = p.Active
                }).ToListAsync();
        }

        public async Task<ProductResponseDto?> GetByIdAsync(int id)
        {
            return await _db.Products.AsNoTracking()
                .Where(p => p.Id == id)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Stock = p.Stock,
                    Active = p.Active
                })
                .FirstOrDefaultAsync();
        }

        public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name.Trim(),
                Description = dto.Description.Trim(),
                Price = dto.Price,
                Stock = dto.Stock,
                Active = true
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Active = product.Active
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdateProductDto dto)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null) return false;

            product.Name = dto.Name.Trim();
            product.Description = dto.Description.Trim();
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            product.Active = dto.Active;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null) return false;

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
