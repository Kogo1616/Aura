using Aura_Core.Models;
using Aura_Core.Models.DbModels;

namespace Aura_Core.Extensions;

public static class ApplicationBuilderExtensions
{
    public static WebApplication UseAppMiddleware(this WebApplication app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Aura API V1"); });
        }

        app.ApplyMigrations();

        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        // Map Identity API endpoints
        app.MapIdentityApi<User>();

        app.UseCors(policy =>
            policy
                .WithOrigins("http://localhost:8081", "http://192.168.100.3:5020"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
        );

        // Map controllers
        app.MapControllers();

        return app;
    }
}