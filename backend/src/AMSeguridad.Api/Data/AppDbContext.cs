using AMSeguridad.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<LandingContent> LandingContents => Set<LandingContent>();
    public DbSet<HeroHighlight> HeroHighlights => Set<HeroHighlight>();
    public DbSet<GuidanceTag> GuidanceTags => Set<GuidanceTag>();
    public DbSet<ServiceItem> ServiceItems => Set<ServiceItem>();
    public DbSet<ServiceItemDetail> ServiceItemDetails => Set<ServiceItemDetail>();
    public DbSet<SolutionItem> SolutionItems => Set<SolutionItem>();
    public DbSet<TechnologyItem> TechnologyItems => Set<TechnologyItem>();
    public DbSet<ProductItem> ProductItems => Set<ProductItem>();
    public DbSet<CompanyMetric> CompanyMetrics => Set<CompanyMetric>();
    public DbSet<NewsItem> NewsItems => Set<NewsItem>();
    public DbSet<ContactChannel> ContactChannels => Set<ContactChannel>();
    public DbSet<ResourceItem> ResourceItems => Set<ResourceItem>();
    public DbSet<JobsPoint> JobsPoints => Set<JobsPoint>();

    public DbSet<UserAccount> UserAccounts => Set<UserAccount>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.HeroHighlights)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.GuidanceTags)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.Services)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ServiceItem>()
            .HasMany(s => s.Items)
            .WithOne()
            .HasForeignKey(i => i.ServiceItemId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.Solutions)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.Technology)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.Products)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.CompanyMetrics)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.News)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.ContactChannels)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.Resources)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<LandingContent>()
            .HasMany(l => l.JobsPoints)
            .WithOne()
            .HasForeignKey(h => h.LandingContentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
