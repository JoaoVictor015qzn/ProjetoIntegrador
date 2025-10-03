using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WalkWord.Application.DTOs;
using WalkWord.Application.Services;

namespace WalkWord.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuariosController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // ✅ Cadastro de usuário
        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioCadastroDto dto)
        {
            var usuario = await _usuarioService.CadastrarAsync(dto);
            return Ok(new { usuario.Id, usuario.Nome, usuario.Email, usuario.CriadoEm });
        }

        // ✅ Listar usuários (rota protegida com JWT)
        [HttpGet("listar")]
        [Authorize]
        public async Task<IActionResult> Listar()
        {
            var usuarios = await _usuarioService.ListarAsync();
            return Ok(usuarios.Select(u => new { u.Id, u.Nome, u.Email, u.CriadoEm }));
        }

        // ✅ Login de usuário (gera token JWT)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDto dto)
        {
            var token = await _usuarioService.LoginAsync(dto);

            if (token == null)
                return Unauthorized("Email ou senha inválidos.");

            return Ok(new { Token = token });
        }
    }
}
