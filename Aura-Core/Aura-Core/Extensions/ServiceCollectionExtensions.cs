using Aura_Core.DbContext;
using Aura_Core.Interfaces;
using Aura_Core.Models;
using Aura_Core.Models.DbModels;
using Aura_Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Aura_Core.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration,
        string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddControllers();

        // Configure Identity
        services.AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<AuraDbContext>()
            .AddApiEndpoints();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = IdentityConstants.BearerScheme;
            options.DefaultChallengeScheme = IdentityConstants.BearerScheme;
        }).AddBearerToken(IdentityConstants.BearerScheme);

        services.AddDbContext<AuraDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddAuthorization();

        // Enhanced Swagger configuration
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Aura API", Version = "v1" });

            // Add security definition for Bearer token
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer"
            });

            // Add security requirement
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        services.AddTransient<IProviderService, ProviderService>();
        services.AddTransient<IAuthService, AuthService>();

        return services;
    }
}