using Aura_Core.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddAppServices(builder.Configuration, args);

var app = builder.Build();

// Configure middleware
app.UseAppMiddleware(app.Environment);

app.Run();