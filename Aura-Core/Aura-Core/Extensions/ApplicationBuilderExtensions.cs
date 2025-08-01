using Aura_Core.Models;

namespace Aura_Core.Extensions;

public static class ApplicationBuilderExtensions
{
    public static WebApplication UseAppMiddleware(this WebApplication app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => 
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Aura API V1");
            });
        }

        app.ApplyMigrations();
    
        app.UseHttpsRedirection();
        app.UseRouting();
    
        app.UseAuthentication();
        app.UseAuthorization();

        // Map Identity API endpoints
        app.MapIdentityApi<User>();
    
        // Map controllers
        app.MapControllers();

        return app;
    }
}