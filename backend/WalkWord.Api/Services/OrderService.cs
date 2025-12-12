using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using WalkWord.Api.Data;
using WalkWord.Api.DTOs.Orders;
using WalkWord.Api.Models;

namespace WalkWord.Api.Services
{
    public class OrderService
    {
        private readonly AppDbContext _db;

        public OrderService(AppDbContext db) => _db = db;

        public async Task<OrderResponseDto> CheckoutAsync(int userId)
        {
            var cart = await _db.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart is null || cart.Items.Count == 0)
                throw new InvalidOperationException("Carrinho vazio.");

            // valida estoque
            foreach (var item in cart.Items)
            {
                if (item.Product is null || !item.Product.Active)
                    throw new InvalidOperationException("Carrinho contém produto inválido/inativo.");

                if (item.Qty > item.Product.Stock)
                    throw new InvalidOperationException($"Estoque insuficiente para o produto {item.Product.Name}.");
            }

            // baixa estoque + calcula total
            decimal total = 0;
            var snapshot = cart.Items.Select(i => new
            {
                i.ProductId,
                ProductName = i.Product!.Name,
                i.Qty,
                i.UnitPrice,
                LineTotal = i.UnitPrice * i.Qty
            }).ToList();

            foreach (var item in cart.Items)
            {
                item.Product!.Stock -= item.Qty;
                total += item.UnitPrice * item.Qty;
            }

            var order = new Order
            {
                UserId = userId,
                ItemsJson = JsonSerializer.Serialize(snapshot),
                Total = total,
                CreatedAt = DateTime.UtcNow
            };

            _db.Orders.Add(order);

            // limpa carrinho
            _db.CartItems.RemoveRange(cart.Items);
            cart.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return new OrderResponseDto
            {
                Id = order.Id,
                UserId = order.UserId,
                ItemsJson = order.ItemsJson,
                Total = order.Total,
                CreatedAt = order.CreatedAt
            };
        }

        public async Task<List<OrderResponseDto>> GetMyOrdersAsync(int userId)
        {
            return await _db.Orders.AsNoTracking()
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.Id)
                .Select(o => new OrderResponseDto
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    ItemsJson = o.ItemsJson,
                    Total = o.Total,
                    CreatedAt = o.CreatedAt
                })
                .ToListAsync();
        }
    }
}
