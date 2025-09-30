using WalkWord.Application.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<UsuarioService>(); // em memória

var app = builder.Build();

app.MapControllers();
app.Run();
