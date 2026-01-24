using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AMSeguridad.Api.Entities;

[Table("landing_contents")]
public sealed class LandingContent
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    [Column("hero_eyebrow")]
    public string HeroEyebrow { get; set; } = string.Empty;
    [Column("hero_title")]
    public string HeroTitle { get; set; } = string.Empty;
    [Column("hero_lead")]
    public string HeroLead { get; set; } = string.Empty;
    [Column("hero_primary_cta")]
    public string HeroPrimaryCta { get; set; } = string.Empty;
    [Column("hero_secondary_cta")]
    public string HeroSecondaryCta { get; set; } = string.Empty;
    [Column("hero_contact_cta")]
    public string HeroContactCta { get; set; } = string.Empty;
    [Column("hero_image_url")]
    public string HeroImageUrl { get; set; } = string.Empty;
    [Column("guidance_eyebrow")]
    public string GuidanceEyebrow { get; set; } = string.Empty;
    [Column("guidance_title")]
    public string GuidanceTitle { get; set; } = string.Empty;
    [Column("guidance_text")]
    public string GuidanceText { get; set; } = string.Empty;
    [Column("contact_eyebrow")]
    public string ContactEyebrow { get; set; } = string.Empty;
    [Column("contact_title")]
    public string ContactTitle { get; set; } = string.Empty;
    [Column("contact_text")]
    public string ContactText { get; set; } = string.Empty;
    [Column("contact_whatsapp")]
    public string ContactWhatsapp { get; set; } = string.Empty;
    [Column("contact_commercial_email")]
    public string ContactCommercialEmail { get; set; } = string.Empty;
    [Column("jobs_eyebrow")]
    public string JobsEyebrow { get; set; } = string.Empty;
    [Column("jobs_title")]
    public string JobsTitle { get; set; } = string.Empty;
    [Column("jobs_text")]
    public string JobsText { get; set; } = string.Empty;
    [Column("updated_at")]
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public List<HeroHighlight> HeroHighlights { get; set; } = [];
    public List<GuidanceTag> GuidanceTags { get; set; } = [];
    public List<ServiceItem> Services { get; set; } = [];
    public List<SolutionItem> Solutions { get; set; } = [];
    public List<TechnologyItem> Technology { get; set; } = [];
    public List<ProductItem> Products { get; set; } = [];
    public List<CompanyMetric> CompanyMetrics { get; set; } = [];
    public List<NewsItem> News { get; set; } = [];
    public List<ContactChannel> ContactChannels { get; set; } = [];
    public List<ResourceItem> Resources { get; set; } = [];
    public List<JobsPoint> JobsPoints { get; set; } = [];
}

[Table("hero_highlights")]
public sealed class HeroHighlight
{   
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("title")]
    public string Title { get; set; } = string.Empty;
    [Column("text")]
    public string Text { get; set; } = string.Empty;
}

[Table("guidance_tags")]
public sealed class GuidanceTag
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("value")]
    public string Value { get; set; } = string.Empty;
}

[Table("services")]
public sealed class ServiceItem
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("title")]
    public string Title { get; set; } = string.Empty;
    [Column("description")]
    public string Description { get; set; } = string.Empty;
    public List<ServiceItemDetail> Items { get; set; } = [];
}

[Table("service_items")]
public sealed class ServiceItemDetail
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    [Column("service_id")]
    public int ServiceItemId { get; set; }
    [Column("value")]
    public string Value { get; set; } = string.Empty;
}

[Table("solutions")]
public sealed class SolutionItem
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("tag")]
    public string Tag { get; set; } = string.Empty;
    [Column("title")]   
    public string Title { get; set; } = string.Empty;
    [Column("text")]
    public string Text { get; set; } = string.Empty;
}


[Table("technology_items")]
public sealed class TechnologyItem
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("title")]
    public string Title { get; set; } = string.Empty;
    [Column("text")]
    public string Text { get; set; } = string.Empty;
    [Column("meta")]
    public string Meta { get; set; } = string.Empty;
    [Column("image_url")]
    public string? ImageUrl { get; set; }
}

[Table("product_items")]
public sealed class ProductItem
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    [Column("category")]
    public string Category { get; set; } = string.Empty;
    [Column("description")]
    public string Description { get; set; } = string.Empty;
    [Column("image_url")]
    public string? ImageUrl { get; set; }
}

[Table("company_metrics")]
public sealed class CompanyMetric
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("value")]
    public string Value { get; set; } = string.Empty;
    [Column("label")]
    public string Label { get; set; } = string.Empty;
    [Column("text")]
    public string Text { get; set; } = string.Empty;
}

[Table("news_items")]
public sealed class NewsItem
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("date")]
    public string Date { get; set; } = string.Empty;
    [Column("title")]
    public string Title { get; set; } = string.Empty;
    [Column("text")]
    public string Text { get; set; } = string.Empty;
    [Column("image_url")]
    public string? ImageUrl { get; set; }
    [Column("created_at")]
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

[Table("contact_channels")]
public sealed class ContactChannel
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("label")]
    public string Label { get; set; } = string.Empty;
    [Column("value")]
    public string Value { get; set; } = string.Empty;
}


[Table("resources")]
public sealed class ResourceItem
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("title")]
    public string Title { get; set; } = string.Empty;
    [Column("href")]
    public string Href { get; set; } = string.Empty;
    [Column("description")]
    public string Description { get; set; } = string.Empty;
}


[Table("jobs_points")]
public sealed class JobsPoint
{
    [Column("id")]
    public int Id { get; set; }
    [Column("landing_content_id")]
    public int LandingContentId { get; set; }
    [Column("value")]
    public string Value { get; set; } = string.Empty;
}
