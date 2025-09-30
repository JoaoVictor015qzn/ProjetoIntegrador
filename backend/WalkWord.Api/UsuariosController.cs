using Microsoft.AspNetCore.Mvc;
using WalkWord.Application.DTOs;
using WalkWord.Application.Services;

namespace WalkWord.Api.Controllers
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

        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioCadastroDto dto)
        {
            var usuario = await _usuarioService.CadastrarAsync(dto);
            return Ok(new { usuario.Id, usuario.Nome, usuario.Email, usuario.CriadoEm });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var usuarios = await _usuarioService.ListarAsync();
            return Ok(usuarios.Select(u => new { u.Id, u.Nome, u.Email, u.CriadoEm }));
        }
    }
}
