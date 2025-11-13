using WalkWord.Application.DTOs;
using WalkWord.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WalkWord.Application.Services
{
    public class UsuarioService
    {
        private static readonly List<Usuario> _usuarios = new(); // lista em memória
        private readonly PasswordHasher<Usuario> _passwordHasher = new();
        private readonly IConfiguration _config;

        public UsuarioService(IConfiguration config)
        {
            _config = config;
        }

        // ✅ Cadastro de usuário
        public Task<Usuario> CadastrarAsync(UsuarioCadastroDto dto)
        {
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email
            };

            usuario.SenhaHash = _passwordHasher.HashPassword(usuario, dto.Senha);

            _usuarios.Add(usuario);

            return Task.FromResult(usuario);
        }

        // ✅ Listar todos os usuários
        public Task<IEnumerable<Usuario>> ListarAsync()
        {
            return Task.FromResult(_usuarios.AsEnumerable());
        }

        // ✅ Login e geração de JWT
        public Task<string?> LoginAsync(UsuarioLoginDto dto)
        {
            var usuario = _usuarios.FirstOrDefault(u => u.Email == dto.Email);
            if (usuario == null)
                return Task.FromResult<string?>(null);

            var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.SenhaHash, dto.Senha);
            if (resultado == PasswordVerificationResult.Failed)
                return Task.FromResult<string?>(null);

            // Gerar token JWT
            var jwtSettings = _config.GetSection("Jwt");

            // 🔹 Ajuste importante: se faltar Key no appsettings.json, não vai quebrar o código
            var secretKey = jwtSettings["Key"];
            if (string.IsNullOrEmpty(secretKey))
                throw new Exception("A chave secreta JWT não foi configurada.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
                new Claim("nome", usuario.Nome)
            };

            var expireMinutes = Convert.ToDouble(jwtSettings["ExpireMinutes"] ?? "60"); // padrão 60 min

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(expireMinutes),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Task.FromResult<string?>(tokenString);
        }
    }
}
