namespace WalkWord.Api.DTOs.Auth
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = "";
        public int UserId { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
    }
}
