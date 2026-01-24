using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models;

public sealed record class LandingContent
{
    [Required]
    public HeroContent Hero { get; init; } = new();

    [Required]
    public GuidanceContent Guidance { get; init; } = new();

    public List<ServiceItem> Services { get; init; } = [];
    public List<SolutionItem> Solutions { get; init; } = [];
    public List<TechnologyItem> Technology { get; init; } = [];
    public List<ProductItem> Products { get; init; } = [];
    public List<CompanyMetric> Company { get; init; } = [];
    public List<NewsItem> News { get; init; } = [];

    [Required]
    public ContactContent Contact { get; init; } = new();

    [Required]
    public JobsContent Jobs { get; init; } = new();
}

public sealed record class HeroContent
{
    public string Eyebrow { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Lead { get; init; } = string.Empty;
    public string PrimaryCta { get; init; } = string.Empty;
    public string SecondaryCta { get; init; } = string.Empty;
    public string ContactCta { get; init; } = string.Empty;
    public string ImageUrl { get; init; } = string.Empty;
    public List<HeroHighlight> Highlights { get; init; } = [];
}

public sealed record class HeroHighlight
{
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
}

public sealed record class GuidanceContent
{
    public string Eyebrow { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
    public List<string> Tags { get; init; } = [];
}

public sealed record class ServiceItem
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public List<string> Items { get; init; } = [];
}

public sealed record class SolutionItem
{
    public string Tag { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
}

public sealed record class TechnologyItem
{
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
    public string Meta { get; init; } = string.Empty;
    public string? ImageUrl { get; init; }
}


public sealed record class ProductItem
{
    public string Name { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string? ImageUrl { get; init; }
}

public sealed record class CompanyMetric
{
    public string Value { get; init; } = string.Empty;
    public string Label { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
}

public sealed record class NewsItem
{
    public string Id { get; init; } = string.Empty;
    public string Date { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
    public string? ImageUrl { get; init; }
}

public sealed record class ContactContent
{
    public string Eyebrow { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
    public string Whatsapp { get; init; } = string.Empty;
    public string CommercialEmail { get; init; } = string.Empty;
    public List<ContactChannel> Channels { get; init; } = [];
    public List<ResourceItem> Resources { get; init; } = [];
}

public sealed record class ContactChannel
{
    public string Label { get; init; } = string.Empty;
    public string Value { get; init; } = string.Empty;
}

public sealed record class ResourceItem
{
    public string Id { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Href { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
}

public sealed record class JobsContent
{
    public string Eyebrow { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;
    public List<string> Points { get; init; } = [];
}
