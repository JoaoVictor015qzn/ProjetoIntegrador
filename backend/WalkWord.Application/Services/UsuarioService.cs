using WalkWord.Application.DTOs;
using WalkWord.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace WalkWord.Application.Services
{
    public class UsuarioService
    {
        private static readonly List<Usuario> _usuarios = new(); // lista em memória
        private readonly PasswordHasher<Usuario> _passwordHasher = new();

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

        public Task<IEnumerable<Usuario>> ListarAsync()
        {
            return Task.FromResult(_usuarios.AsEnumerable());
        }
    }
}
