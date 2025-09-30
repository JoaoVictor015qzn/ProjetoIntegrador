namespace WalkWord.Domain.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty; // nunca salvar senha em texto puro
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    }
}
