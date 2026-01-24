namespace AMSeguridad.Api.Entities;

public sealed class LandingContent
{
    public Guid Id { get; set; }
    public string HeroEyebrow { get; set; } = string.Empty;
    public string HeroTitle { get; set; } = string.Empty;
    public string HeroLead { get; set; } = string.Empty;
    public string HeroPrimaryCta { get; set; } = string.Empty;
    public string HeroSecondaryCta { get; set; } = string.Empty;
    public string HeroContactCta { get; set; } = string.Empty;
    public string HeroImageUrl { get; set; } = string.Empty;
    public string GuidanceEyebrow { get; set; } = string.Empty;
    public string GuidanceTitle { get; set; } = string.Empty;
    public string GuidanceText { get; set; } = string.Empty;
    public string ContactEyebrow { get; set; } = string.Empty;
    public string ContactTitle { get; set; } = string.Empty;
    public string ContactText { get; set; } = string.Empty;
    public string ContactWhatsapp { get; set; } = string.Empty;
    public string ContactCommercialEmail { get; set; } = string.Empty;
    public string JobsEyebrow { get; set; } = string.Empty;
    public string JobsTitle { get; set; } = string.Empty;
    public string JobsText { get; set; } = string.Empty;
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

public sealed class HeroHighlight
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}

public sealed class GuidanceTag
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Value { get; set; } = string.Empty;
}

public sealed class ServiceItem
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<ServiceItemDetail> Items { get; set; } = [];
}

public sealed class ServiceItemDetail
{
    public Guid Id { get; set; }
    public Guid ServiceItemId { get; set; }
    public string Value { get; set; } = string.Empty;
}

public sealed class SolutionItem
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Tag { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}

public sealed class TechnologyItem
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string Meta { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}

public sealed class ProductItem
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}

public sealed class CompanyMetric
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}

public sealed class NewsItem
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Date { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public sealed class ContactChannel
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public sealed class ResourceItem
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Href { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public sealed class JobsPoint
{
    public Guid Id { get; set; }
    public Guid LandingContentId { get; set; }
    public string Value { get; set; } = string.Empty;
}
