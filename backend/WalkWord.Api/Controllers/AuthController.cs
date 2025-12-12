using Microsoft.AspNetCore.Mvc;
using WalkWord.Api.DTOs.Auth;
using WalkWord.Api.Services;

namespace WalkWord.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _users;

        public AuthController(UserService users) => _users = users;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var res = await _users.RegisterAsync(dto);
                return Created("", res); // 201
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message); // 409
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var res = await _users.LoginAsync(dto);
            if (res is null) return Unauthorized("Email ou senha inválidos.");

            return Ok(res);
        }
    }
}
