namespace AMSeguridad.Api.DTOs;

public sealed record HeroHighlightDto(string Title, string Text);
public sealed record HeroDto(
    string Eyebrow,
    string Title,
    string Lead,
    string PrimaryCta,
    string SecondaryCta,
    string ContactCta,
    string? ImagePublicId,
    List<HeroHighlightDto> Highlights
);

public sealed record GuidanceDto(string Eyebrow, string Title, string Text, List<string> Tags);

public sealed record ServiceItemDto(string Title, string Description, List<string> Items, string? ImagePublicId = null);
public sealed record SolutionItemDto(string Tag, string Title, string Text);
public sealed record TechnologyItemDto(string Title, string Text, string Meta, string? ImagePublicId);
public sealed record ProductItemDto(string Name, string Category, string Description, string? ImagePublicId);
public sealed record CompanyMetricDto(string Value, string Label, string Text);
public sealed record NewsItemDto(string Date, string Title, string Text, string? ImagePublicId = null, int Id = 0);
public sealed record ContactChannelDto(string Label, string Value);
public sealed record ResourceItemDto(string Title, string Href, string Description, int Id = 0);
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

// DTOs de actualización por sección
public sealed record HeroUpdateDto(string Eyebrow, string Title, string Lead, string PrimaryCta, string SecondaryCta, string ContactCta, string? ImagePublicId, List<HeroHighlightDto> Highlights);
public sealed record GuidanceUpdateDto(string Eyebrow, string Title, string Text, List<string> Tags);
public sealed record ServicesUpdateDto(List<ServiceItemDto> Services);
public sealed record SolutionsUpdateDto(List<SolutionItemDto> Solutions);
public sealed record TechnologyUpdateDto(List<TechnologyItemDto> Technology);
public sealed record ProductsUpdateDto(List<ProductItemDto> Products);
public sealed record CompanyUpdateDto(List<CompanyMetricDto> Metrics);
public sealed record NewsUpdateDto(List<NewsItemDto> News);
public sealed record ContactUpdateDto(string Eyebrow, string Title, string Text, string Whatsapp, string CommercialEmail, List<ContactChannelDto> Channels, List<ResourceItemDto> Resources);
public sealed record JobsUpdateDto(string Eyebrow, string Title, string Text, List<string> Points);
