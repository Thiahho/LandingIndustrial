using AMSeguridad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // 1. Tablas de Sistema
    public DbSet<UserAccount> UserAccounts { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    // 2. Contenido Principal
    public DbSet<LandingContent> LandingContents { get; set; }

    // 3. Tablas Relacionadas (Hijos directos de LandingContent)
    public DbSet<HeroHighlight> HeroHighlights { get; set; }
    public DbSet<GuidanceTag> GuidanceTags { get; set; }
    public DbSet<Solution> Solutions { get; set; }
    public DbSet<TechnologyItem> TechnologyItems { get; set; }
    public DbSet<Products> ProductItems { get; set; } // Mapeado a la clase Products
    public DbSet<CompanyMetric> CompanyMetrics { get; set; }
    public DbSet<NewsItem> NewsItems { get; set; }
    public DbSet<ContactChannel> ContactChannels { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<JobsPoint> JobsPoints { get; set; }

    // 4. Servicios y sus items (Jerarquía anidada)
    public DbSet<Service> Services { get; set; }
    public DbSet<ServiceItem> ServiceItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // --- Configuración de Relaciones y Borrado en Cascada ---
        // Esto asegura que Entity Framework respete el ON DELETE CASCADE de tu SQL

        // Relación: LandingContent -> HeroHighlights
        modelBuilder.Entity<HeroHighlight>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.HeroHighlights)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> GuidanceTags
        modelBuilder.Entity<GuidanceTag>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.GuidanceTags)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> Services
        modelBuilder.Entity<Service>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.Services)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: Service -> ServiceItems
        modelBuilder.Entity<ServiceItem>()
            .HasOne(e => e.Service)
            .WithMany(s => s.Items)
            .HasForeignKey(e => e.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> Solutions
        modelBuilder.Entity<Solution>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.Solutions)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> TechnologyItems
        modelBuilder.Entity<TechnologyItem>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.Technology)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> Products (Table: product_items)
        modelBuilder.Entity<Products>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.Products)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> CompanyMetrics
        modelBuilder.Entity<CompanyMetric>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.CompanyMetrics)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> NewsItems
        modelBuilder.Entity<NewsItem>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.News)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> ContactChannels
        modelBuilder.Entity<ContactChannel>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.ContactChannels)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> Resources
        modelBuilder.Entity<Resource>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.Resources)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: LandingContent -> JobsPoints
        modelBuilder.Entity<JobsPoint>()
            .HasOne(e => e.LandingContent)
            .WithMany(lc => lc.JobsPoints)
            .HasForeignKey(e => e.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
