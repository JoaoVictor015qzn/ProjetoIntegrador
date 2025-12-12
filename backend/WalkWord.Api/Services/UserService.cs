using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using WalkWord.Api.Data;
using WalkWord.Api.DTOs.Auth;
using WalkWord.Api.DTOs.Users;
using WalkWord.Api.Models;

namespace WalkWord.Api.Services
{
    public class UserService
    {
        private readonly AppDbContext _db;
        private readonly JwtTokenService _jwt;

        public UserService(AppDbContext db, JwtTokenService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto)
        {
            var email = dto.Email.Trim().ToLower();

            var exists = await _db.Users.AnyAsync(u => u.Email == email);
            if (exists) throw new InvalidOperationException("Email já cadastrado.");

            var user = new User
            {
                Name = dto.Name.Trim(),
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                CreatedAt = DateTime.UtcNow
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // cria carrinho automaticamente
            _db.Carts.Add(new Cart { UserId = user.Id });
            await _db.SaveChangesAsync();

            var token = _jwt.GenerateToken(user);

            return new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email
            };
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginRequestDto dto)
        {
            var email = dto.Email.Trim().ToLower();

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null) return null;

            var ok = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!ok) return null;

            return new AuthResponseDto
            {
                Token = _jwt.GenerateToken(user),
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email
            };
        }

        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            return await _db.Users
                .AsNoTracking()
                .OrderByDescending(u => u.Id)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<UserResponseDto?> GetByIdAsync(int id)
        {
            return await _db.Users
                .AsNoTracking()
                .Where(u => u.Id == id)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    CreatedAt = u.CreatedAt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateAsync(int id, UpdateUserDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) return false;

            var newEmail = dto.Email.Trim().ToLower();
            var emailTaken = await _db.Users.AnyAsync(u => u.Email == newEmail && u.Id != id);
            if (emailTaken) throw new InvalidOperationException("Email já está em uso.");

            user.Name = dto.Name.Trim();
            user.Email = newEmail;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) return false;

            // regra simples: remover também carrinho e itens
            var cart = await _db.Carts.FirstOrDefaultAsync(c => c.UserId == id);
            if (cart != null)
            {
                var items = _db.CartItems.Where(i => i.CartId == cart.Id);
                _db.CartItems.RemoveRange(items);
                _db.Carts.Remove(cart);
            }

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
