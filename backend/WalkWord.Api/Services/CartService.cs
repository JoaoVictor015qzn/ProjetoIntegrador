using Microsoft.EntityFrameworkCore;
using WalkWord.Api.Data;
using WalkWord.Api.DTOs.Cart;
using WalkWord.Api.Models;

namespace WalkWord.Api.Services
{
    public class CartService
    {
        private readonly AppDbContext _db;
        public CartService(AppDbContext db) => _db = db;

        public async Task<Cart> GetOrCreateCartAsync(int userId)
        {
            var cart = await _db.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null) return cart;

            cart = new Cart { UserId = userId };
            _db.Carts.Add(cart);
            await _db.SaveChangesAsync();
            return cart;
        }

        public async Task<CartResponseDto> GetCartAsync(int userId)
        {
            var cart = await _db.Carts
                .AsNoTracking()
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart is null)
                cart = (await GetOrCreateCartAsync(userId));

            return MapCart(cart);
        }

        public async Task<CartResponseDto> AddItemAsync(int userId, AddCartItemDto dto)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == dto.ProductId);
            if (product is null || !product.Active) throw new InvalidOperationException("Produto inválido/inativo.");
            if (dto.Qty <= 0) throw new InvalidOperationException("Quantidade inválida.");
            if (dto.Qty > product.Stock) throw new InvalidOperationException("Quantidade maior que o estoque.");

            var cart = await GetOrCreateCartAsync(userId);

            var item = await _db.CartItems.FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == dto.ProductId);

            if (item is null)
            {
                item = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = dto.ProductId,
                    Qty = dto.Qty,
                    UnitPrice = product.Price
                };
                _db.CartItems.Add(item);
            }
            else
            {
                var newQty = item.Qty + dto.Qty;
                if (newQty > product.Stock) throw new InvalidOperationException("Quantidade total maior que o estoque.");
                item.Qty = newQty;
            }

            cart.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return await GetCartAsync(userId);
        }

        public async Task<CartResponseDto> UpdateQtyAsync(int userId, int productId, int qty)
        {
            var cart = await GetOrCreateCartAsync(userId);

            var item = await _db.CartItems.FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == productId);
            if (item is null) throw new KeyNotFoundException("Item não encontrado no carrinho.");

            if (qty <= 0)
            {
                _db.CartItems.Remove(item);
            }
            else
            {
                var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == productId);
                if (product is null || !product.Active) throw new InvalidOperationException("Produto inválido/inativo.");
                if (qty > product.Stock) throw new InvalidOperationException("Quantidade maior que o estoque.");
                item.Qty = qty;
            }

            cart.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return await GetCartAsync(userId);
        }

        public async Task<CartResponseDto> RemoveItemAsync(int userId, int productId)
        {
            var cart = await GetOrCreateCartAsync(userId);

            var item = await _db.CartItems.FirstOrDefaultAsync(i => i.CartId == cart.Id && i.ProductId == productId);
            if (item is null) throw new KeyNotFoundException("Item não encontrado no carrinho.");

            _db.CartItems.Remove(item);
            cart.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return await GetCartAsync(userId);
        }

        public async Task<CartResponseDto> ClearAsync(int userId)
        {
            var cart = await GetOrCreateCartAsync(userId);
            var items = _db.CartItems.Where(i => i.CartId == cart.Id);
            _db.CartItems.RemoveRange(items);

            cart.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return await GetCartAsync(userId);
        }

        private CartResponseDto MapCart(Cart cart)
        {
            var dto = new CartResponseDto
            {
                UserId = cart.UserId,
                UpdatedAt = cart.UpdatedAt
            };

            foreach (var i in cart.Items)
            {
                var name = i.Product?.Name ?? "";
                var lineTotal = i.UnitPrice * i.Qty;

                dto.Items.Add(new CartResponseDto.CartItemView
                {
                    ProductId = i.ProductId,
                    ProductName = name,
                    Qty = i.Qty,
                    UnitPrice = i.UnitPrice,
                    LineTotal = lineTotal
                });

                dto.Total += lineTotal;
            }

            return dto;
        }
    }
}
