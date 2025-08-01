using Aura_Core.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Aura_Core.Extensions;

public static class MigrationExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using IServiceScope serviceScope = app.ApplicationServices.CreateScope();

        using AuraDbContext context = serviceScope.ServiceProvider.GetRequiredService<AuraDbContext>();

        context.Database.Migrate();
    }
}