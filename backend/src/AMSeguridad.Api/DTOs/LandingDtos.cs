namespace AMSeguridad.Api.DTOs;

public sealed record HeroHighlightDto(string Title, string Text);
public sealed record HeroDto(
    string Eyebrow,
    string Title,
    string Lead,
    string PrimaryCta,
    string SecondaryCta,
    string ContactCta,
    string ImageUrl,
    List<HeroHighlightDto> Highlights
);

public sealed record GuidanceDto(string Eyebrow, string Title, string Text, List<string> Tags);

public sealed record ServiceItemDto(string Title, string Description, List<string> Items);
public sealed record SolutionItemDto(string Tag, string Title, string Text);
public sealed record TechnologyItemDto(string Title, string Text, string Meta, string? ImageUrl);
public sealed record ProductItemDto(string Name, string Category, string Description, string? ImageUrl);
public sealed record CompanyMetricDto(string Value, string Label, string Text);
public sealed record NewsItemDto(Guid Id, string Date, string Title, string Text, string? ImageUrl);
public sealed record ContactChannelDto(string Label, string Value);
public sealed record ResourceItemDto(Guid Id, string Title, string Href, string Description);
public sealed record ContactDto(
    string Eyebrow,
    string Title,
    string Text,
    string Whatsapp,
    string CommercialEmail,
    List<ContactChannelDto> Channels,
    List<ResourceItemDto> Resources
);
public sealed record JobsDto(string Eyebrow, string Title, string Text, List<string> Points);

public sealed record LandingContentDto(
    HeroDto Hero,
    GuidanceDto Guidance,
    List<ServiceItemDto> Services,
    List<SolutionItemDto> Solutions,
    List<TechnologyItemDto> Technology,
    List<ProductItemDto> Products,
    List<CompanyMetricDto> Company,
    List<NewsItemDto> News,
    ContactDto Contact,
    JobsDto Jobs
);
