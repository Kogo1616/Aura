using Aura_Core.Models;
using Aura_Core.Models.DbModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Aura_Core.DbContext;

public class AuraDbContext : IdentityDbContext<User>
{
    public AuraDbContext(DbContextOptions<AuraDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasDefaultSchema("aura");

        // Configure ProviderUserDetail
        modelBuilder.Entity<ProviderUserDetail>(entity =>
        {
            entity.HasOne(p => p.User)
                .WithOne(u => u.ProviderDetail)
                .HasForeignKey<ProviderUserDetail>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure RegularUserDetail
        modelBuilder.Entity<RegularUserDetail>(entity =>
        {
            entity.HasOne(r => r.User)
                .WithOne(u => u.RegularDetail)
                .HasForeignKey<RegularUserDetail>(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure Review
        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasOne(r => r.ProviderUserDetail)
                .WithMany(p => p.Reviews)
                .HasForeignKey(r => r.ProviderId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Configure Service
        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasOne(s => s.ProviderUserDetail)
                .WithMany(p => p.Services)
                .HasForeignKey(s => s.ProviderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure Booking
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasOne(b => b.Service)
                .WithMany(s => s.Bookings)
                .HasForeignKey(b => b.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    public DbSet<ProviderUserDetail> ProviderUserDetails { get; set; }
    public DbSet<RegularUserDetail> RegularUserDetails { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<ProviderSkill> ProviderSkills { get; set; }
}