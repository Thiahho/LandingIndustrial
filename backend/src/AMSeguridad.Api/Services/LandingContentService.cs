using System.Text.Json;
using AMSeguridad.Api.Data;
using AMSeguridad.Api.DTOs;
using AMSeguridad.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Services;

public sealed class LandingContentService : ILandingContentService
{
    private readonly AppDbContext _db;

    public LandingContentService(AppDbContext db)
    {
        _db = db;
    }

    // public async Task<LandingContentDto> GetAsync(CancellationToken cancellationToken)
    // {
    //     // Usamos CancellationToken.None para evitar cancelar la query si el cliente se desconecta
    //     // (común en React StrictMode que monta/desmonta componentes en desarrollo)
    //     var content = await _db.LandingContents
    //         .Include(l => l.HeroHighlights)
    //         .Include(l => l.GuidanceTags)
    //         .Include(l => l.Services).ThenInclude(s => s.Items)
    //         .Include(l => l.Solutions)
    //         .Include(l => l.Technology)
    //         .Include(l => l.Products)
    //         .Include(l => l.CompanyMetrics)
    //         .Include(l => l.News)
    //         .Include(l => l.ContactChannels)
    //         .Include(l => l.Resources)
    //         .Include(l => l.JobsPoints)
    //         .FirstOrDefaultAsync(CancellationToken.None);

    //     if (content is null)
    //     {
    //         content = new LandingContent();
    //         _db.LandingContents.Add(content);
    //         await _db.SaveChangesAsync(CancellationToken.None);
    //     }

    //     return MapToDto(content);
    // }

    public async Task<LandingContentDto> GetAsync(CancellationToken cancellationToken)
{
    // 1) Token que NO depende del cliente, pero tampoco queda infinito
    using var cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
    cts.CancelAfter(TimeSpan.FromSeconds(20));
    var ct = cts.Token;

    // 2) SplitQuery evita el mega-join cartesiano que te está timeouteando
    var content = await _db.LandingContents
        .AsNoTracking()
        .AsSplitQuery()
        .OrderBy(l => l.Id)
        .Include(l => l.HeroHighlights)
        .Include(l => l.GuidanceTags)
        .Include(l => l.Services).ThenInclude(s => s.Items)
        .Include(l => l.Solutions)
        .Include(l => l.Technology)
        .Include(l => l.Products)
        .Include(l => l.CompanyMetrics)
        .Include(l => l.News)
        .Include(l => l.ContactChannels)
        .Include(l => l.Resources)
        .Include(l => l.JobsPoints)
        .FirstOrDefaultAsync(ct);

    if (content is null)
    {
        // Para crear, no uses AsNoTracking, y guardá con un token controlado
        var entity = new LandingContent();
        _db.LandingContents.Add(entity);
        await _db.SaveChangesAsync(ct);

        // Si necesitás devolver el DTO completo, recargalo (también split)
        content = await _db.LandingContents
            .AsNoTracking()
            .AsSplitQuery()
            .Where(l => l.Id == entity.Id)
            .Include(l => l.HeroHighlights)
            .Include(l => l.GuidanceTags)
            .Include(l => l.Services).ThenInclude(s => s.Items)
            .Include(l => l.Solutions)
            .Include(l => l.Technology)
            .Include(l => l.Products)
            .Include(l => l.CompanyMetrics)
            .Include(l => l.News)
            .Include(l => l.ContactChannels)
            .Include(l => l.Resources)
            .Include(l => l.JobsPoints)
            .FirstAsync(ct);
    }

    return MapToDto(content);
}


    public async Task<LandingContentDto> UpdateAsync(LandingContentDto dto, string actor, CancellationToken cancellationToken)
    {
        // Usamos CancellationToken.None para las queries de BD
        var content = await _db.LandingContents
            .Include(l => l.HeroHighlights)
            .Include(l => l.GuidanceTags)
            .Include(l => l.Services).ThenInclude(s => s.Items)
            .Include(l => l.Solutions)
            .Include(l => l.Technology)
            .Include(l => l.Products)
            .Include(l => l.CompanyMetrics)
            .Include(l => l.News)
            .Include(l => l.ContactChannels)
            .Include(l => l.Resources)
            .Include(l => l.JobsPoints)
            .FirstOrDefaultAsync(CancellationToken.None);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.HeroEyebrow = dto.Hero.Eyebrow;
        content.HeroTitle = dto.Hero.Title;
        content.HeroLead = dto.Hero.Lead;
        content.HeroPrimaryCta = dto.Hero.PrimaryCta;
        content.HeroSecondaryCta = dto.Hero.SecondaryCta;
        content.HeroContactCta = dto.Hero.ContactCta;
        content.HeroImagePublicId = dto.Hero.ImagePublicId;
        content.GuidanceEyebrow = dto.Guidance.Eyebrow;
        content.GuidanceTitle = dto.Guidance.Title;
        content.GuidanceText = dto.Guidance.Text;
        content.ContactEyebrow = dto.Contact.Eyebrow;
        content.ContactTitle = dto.Contact.Title;
        content.ContactText = dto.Contact.Text;
        content.ContactWhatsapp = dto.Contact.Whatsapp;
        content.ContactCommercialEmail = dto.Contact.CommercialEmail;
        content.JobsEyebrow = dto.Jobs.Eyebrow;
        content.JobsTitle = dto.Jobs.Title;
        content.JobsText = dto.Jobs.Text;
        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.HeroHighlights, dto.Hero.Highlights.Select(h => new HeroHighlight
        {
            LandingContentId = content.Id,
            Title = h.Title,
            Text = h.Text
        }));

        ReplaceCollection(content.GuidanceTags, dto.Guidance.Tags.Select(tag => new GuidanceTag
        {
            LandingContentId = content.Id,
            Value = tag
        }));

        ReplaceCollection(content.Services, dto.Services.Select(service => new Service
        {
            LandingContentId = content.Id,
            Title = service.Title,
            Description = service.Description,
            ImagePublicId = service.ImagePublicId,
            Items = service.Items.Select(item => new ServiceItem
            {
                Value = item
            }).ToList()
        }));

        ReplaceCollection(content.Solutions, dto.Solutions.Select(solution => new Solution
        {
            LandingContentId = content.Id,
            Tag = solution.Tag,
            Title = solution.Title,
            Text = solution.Text
        }));

        ReplaceCollection(content.Technology, dto.Technology.Select(item => new TechnologyItem
        {
            LandingContentId = content.Id,
            Title = item.Title,
            Text = item.Text,
            Meta = item.Meta,
            ImagePublicId = item.ImagePublicId
        }));

        ReplaceCollection(content.Products, dto.Products.Select(item => new Products
        {
            LandingContentId = content.Id,
            Name = item.Name,
            Category = item.Category,
            Description = item.Description,
            ImagePublicId = item.ImagePublicId
        }));

        ReplaceCollection(content.CompanyMetrics, dto.Company.Select(metric => new CompanyMetric
        {
            LandingContentId = content.Id,
            Value = metric.Value,
            Label = metric.Label,
            Text = metric.Text
        }));

        ReplaceCollection(content.News, dto.News.Select(item => new NewsItem
        {
            LandingContentId = content.Id,
            Date = item.Date,
            Title = item.Title,
            Text = item.Text,
            ImagePublicId = item.ImagePublicId,
            CreatedAt = DateTime.UtcNow
        }));

        ReplaceCollection(content.ContactChannels, dto.Contact.Channels.Select(channel => new ContactChannel
        {
            LandingContentId = content.Id,
            Label = channel.Label,
            Value = channel.Value
        }));

        ReplaceCollection(content.Resources, dto.Contact.Resources.Select(resource => new Resource
        {
            LandingContentId = content.Id,
            Title = resource.Title,
            Href = resource.Href,
            Description = resource.Description
        }));

        ReplaceCollection(content.JobsPoints, dto.Jobs.Points.Select(point => new JobsPoint
        {
            LandingContentId = content.Id,
            Value = point
        }));

     _db.AuditLogs.Add(new AuditLog
        {
            Actor = actor,
            Action = "Update",
            Entity = "LandingContent",
            EntityId = content.Id,
            Metadata = JsonDocument.Parse(JsonSerializer.Serialize(new
            {
                section = "LandingContent",
                message = "Actualización del panel del Admin",
                heroImagePublicId = dto.Hero?.ImagePublicId,
                heroHighlightsCount = dto.Hero?.Highlights?.Count ?? 0,
                servicesCount = dto.Services?.Count ?? 0,
                updatedAt = DateTime.UtcNow
            })),
            CreatedAt = DateTime.UtcNow
        });


        await _db.SaveChangesAsync(CancellationToken.None);

        return MapToDto(content);
    }

    private static void ReplaceCollection<T>(List<T> target, IEnumerable<T> items)
    {
        target.Clear();
        target.AddRange(items);
    }

    public async Task<HeroDto> UpdateHeroAsync(HeroUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.HeroHighlights)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.HeroEyebrow = dto.Eyebrow;
        content.HeroTitle = dto.Title;
        content.HeroLead = dto.Lead;
        content.HeroPrimaryCta = dto.PrimaryCta;
        content.HeroSecondaryCta = dto.SecondaryCta;
        content.HeroContactCta = dto.ContactCta;
        content.HeroImagePublicId = dto.ImagePublicId;
        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.HeroHighlights, dto.Highlights.Select(h => new HeroHighlight
        {
            LandingContentId = content.Id,
            Title = h.Title,
            Text = h.Text
        }));

 AddAudit(actor, "Hero", content.Id, new
{
    section = "Hero",
    message = "Actualización del Hero",
    imagePublicId = dto.ImagePublicId,
    highlightsCount = dto.Highlights?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return new HeroDto(
            content.HeroEyebrow,
            content.HeroTitle,
            content.HeroLead,
            content.HeroPrimaryCta,
            content.HeroSecondaryCta,
            content.HeroContactCta,
            content.HeroImagePublicId,
            content.HeroHighlights.Select(h => new HeroHighlightDto(h.Title, h.Text)).ToList()
        );
    }

    public async Task<GuidanceDto> UpdateGuidanceAsync(GuidanceUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.GuidanceTags)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.GuidanceEyebrow = dto.Eyebrow;
        content.GuidanceTitle = dto.Title;
        content.GuidanceText = dto.Text;
        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.GuidanceTags, dto.Tags.Select(tag => new GuidanceTag
        {
            LandingContentId = content.Id,
            Value = tag
        }));

        AddAudit(actor, "Guidance", content.Id, new
{
    section = "Guidance",
    message = "Actualización de sección Guidance",
    tagsCount = dto.Tags?.Count ?? 0
});

    
        await _db.SaveChangesAsync(ct);

        return new GuidanceDto(
            content.GuidanceEyebrow,
            content.GuidanceTitle,
            content.GuidanceText,
            content.GuidanceTags.Select(t => t.Value).ToList()
        );
    }

    public async Task<List<ServiceItemDto>> UpdateServicesAsync(ServicesUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.Services).ThenInclude(s => s.Items)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.Services, dto.Services.Select(service => new Service
        {
            LandingContentId = content.Id,
            Title = service.Title,
            Description = service.Description,
            ImagePublicId = service.ImagePublicId,
            Items = service.Items.Select(item => new ServiceItem
            {
                Value = item
            }).ToList()
        }));

 AddAudit(actor, "Service", content.Id, new
{
    section = "Service",
    message = "Actualización de sección Service",
    servicesCount = dto.Services?.Count ?? 0
});

   

        await _db.SaveChangesAsync(ct);

        return content.Services.Select(service => new ServiceItemDto(
            service.Title,
            service.Description,
            service.Items.Select(item => item.Value).ToList(),
            service.ImagePublicId
        )).ToList();
    }

    public async Task<List<SolutionItemDto>> UpdateSolutionsAsync(SolutionsUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.Solutions)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.Solutions, dto.Solutions.Select(solution => new Solution
        {
            LandingContentId = content.Id,
            Tag = solution.Tag,
            Title = solution.Title,
            Text = solution.Text
        }));

        AddAudit(actor, "Solutions", content.Id, new
{
    section = "Solutions",
    message = "Actualización de sección Solutions",
    solutionsCount = dto.Solutions?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return content.Solutions.Select(solution => new SolutionItemDto(
            solution.Tag,
            solution.Title,
            solution.Text
        )).ToList();
    }

    public async Task<List<TechnologyItemDto>> UpdateTechnologyAsync(TechnologyUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.Technology)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.Technology, dto.Technology.Select(item => new TechnologyItem
        {
            LandingContentId = content.Id,
            Title = item.Title,
            Text = item.Text,
            Meta = item.Meta,
            ImagePublicId = item.ImagePublicId
        }));

AddAudit(actor, "Technology", content.Id, new
{
    section = "Technology",
    message = "Actualización de sección Technology",
    itemsCount = dto.Technology?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return content.Technology.Select(item => new TechnologyItemDto(
            item.Title,
            item.Text,
            item.Meta,
            item.ImagePublicId
        )).ToList();
    }

    public async Task<List<ProductItemDto>> UpdateProductsAsync(ProductsUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.Products)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.Products, dto.Products.Select(item => new Products
        {
            LandingContentId = content.Id,
            Name = item.Name,
            Category = item.Category,
            Description = item.Description,
            ImagePublicId = item.ImagePublicId
        }));

AddAudit(actor, "Products", content.Id, new
{
    section = "Products",
    message = "Actualización de sección Products",
    itemsCount = dto.Products?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return content.Products.Select(item => new ProductItemDto(
            item.Name,
            item.Category,
            item.Description,
            item.ImagePublicId
        )).ToList();
    }

    public async Task<List<CompanyMetricDto>> UpdateCompanyAsync(CompanyUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.CompanyMetrics)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.CompanyMetrics, dto.Metrics.Select(metric => new CompanyMetric
        {
            LandingContentId = content.Id,
            Value = metric.Value,
            Label = metric.Label,
            Text = metric.Text
        }));

        AddAudit(actor, "Company", content.Id, new
{
    section = "Company",
    message = "Actualización de sección Company",
    metricsCount = dto.Metrics?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return content.CompanyMetrics.Select(metric => new CompanyMetricDto(
            metric.Value,
            metric.Label,
            metric.Text
        )).ToList();
    }

    public async Task<List<NewsItemDto>> UpdateNewsAsync(NewsUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.News)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.News, dto.News.Select(item => new NewsItem
        {
            LandingContentId = content.Id,
            Date = item.Date,
            Title = item.Title,
            Text = item.Text,
            ImagePublicId = item.ImagePublicId,
            CreatedAt = DateTime.UtcNow
        }));

 AddAudit(actor, "News", content.Id, new
{
    section = "News",
    message = "Actualización de sección News",
    itemsCount = dto.News?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return content.News.Select(news => new NewsItemDto(
            news.Date,
            news.Title,
            news.Text,
            news.ImagePublicId,
            news.Id
        )).ToList();
    }

    public async Task<ContactDto> UpdateContactAsync(ContactUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.ContactChannels)
            .Include(l => l.Resources)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.ContactEyebrow = dto.Eyebrow;
        content.ContactTitle = dto.Title;
        content.ContactText = dto.Text;
        content.ContactWhatsapp = dto.Whatsapp;
        content.ContactCommercialEmail = dto.CommercialEmail;
        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.ContactChannels, dto.Channels.Select(channel => new ContactChannel
        {
            LandingContentId = content.Id,
            Label = channel.Label,
            Value = channel.Value
        }));

        ReplaceCollection(content.Resources, dto.Resources.Select(resource => new Resource
        {
            LandingContentId = content.Id,
            Title = resource.Title,
            Href = resource.Href,
            Description = resource.Description
        }));

 AddAudit(actor, "Contact", content.Id, new
{
    section = "Contact",
    message = "Actualización de sección Contact",
    channelsCount = dto.Channels?.Count ?? 0,
    resourcesCount = dto.Resources?.Count ?? 0
});



        await _db.SaveChangesAsync(ct);

        return new ContactDto(
            content.ContactEyebrow,
            content.ContactTitle,
            content.ContactText,
            content.ContactWhatsapp,
            content.ContactCommercialEmail,
            content.ContactChannels.Select(channel => new ContactChannelDto(channel.Label, channel.Value)).ToList(),
            content.Resources.Select(resource => new ResourceItemDto(
                resource.Title,
                resource.Href,
                resource.Description,
                resource.Id
            )).ToList()
        );
    }

    public async Task<JobsDto> UpdateJobsAsync(JobsUpdateDto dto, string actor, CancellationToken ct)
    {
        var content = await _db.LandingContents
            .Include(l => l.JobsPoints)
            .FirstOrDefaultAsync(ct);

        if (content is null)
        {
            content = new LandingContent();
            _db.LandingContents.Add(content);
        }

        content.JobsEyebrow = dto.Eyebrow;
        content.JobsTitle = dto.Title;
        content.JobsText = dto.Text;
        content.UpdatedAt = DateTime.UtcNow;

        ReplaceCollection(content.JobsPoints, dto.Points.Select(point => new JobsPoint
        {
            LandingContentId = content.Id,
            Value = point
        }));

 AddAudit(actor, "Jobs", content.Id, new
{
    section = "Jobs",
    message = "Actualización de sección Jobs",
    pointsCount = dto.Points?.Count ?? 0
});


        await _db.SaveChangesAsync(ct);

        return new JobsDto(
            content.JobsEyebrow,
            content.JobsTitle,
            content.JobsText,
            content.JobsPoints.Select(point => point.Value).ToList()
        );
    }

    private static LandingContentDto MapToDto(LandingContent content)
    {
        return new LandingContentDto(
            new HeroDto(
                content.HeroEyebrow,
                content.HeroTitle,
                content.HeroLead,
                content.HeroPrimaryCta,
                content.HeroSecondaryCta,
                content.HeroContactCta,
                content.HeroImagePublicId,
                content.HeroHighlights.Select(h => new HeroHighlightDto(h.Title, h.Text)).ToList()
            ),
            new GuidanceDto(
                content.GuidanceEyebrow,
                content.GuidanceTitle,
                content.GuidanceText,
                content.GuidanceTags.Select(t => t.Value).ToList()
            ),
            content.Services.Select(service => new ServiceItemDto(
                service.Title,
                service.Description,
                service.Items.Select(item => item.Value).ToList(),
                service.ImagePublicId
            )).ToList(),
            content.Solutions.Select(solution => new SolutionItemDto(
                solution.Tag,
                solution.Title,
                solution.Text
            )).ToList(),
            content.Technology.Select(item => new TechnologyItemDto(
                item.Title,
                item.Text,
                item.Meta,
                item.ImagePublicId
            )).ToList(),
            content.Products.Select(item => new ProductItemDto(
                item.Name,
                item.Category,
                item.Description,
                item.ImagePublicId
            )).ToList(),
            content.CompanyMetrics.Select(metric => new CompanyMetricDto(
                metric.Value,
                metric.Label,
                metric.Text
            )).ToList(),
            content.News.Select(news => new NewsItemDto(
                news.Date,
                news.Title,
                news.Text,
                news.ImagePublicId,
                news.Id
            )).ToList(),
            new ContactDto(
                content.ContactEyebrow,
                content.ContactTitle,
                content.ContactText,
                content.ContactWhatsapp,
                content.ContactCommercialEmail,
                content.ContactChannels.Select(channel => new ContactChannelDto(channel.Label, channel.Value)).ToList(),
                content.Resources.Select(resource => new ResourceItemDto(
                    resource.Title,
                    resource.Href,
                    resource.Description,
                    resource.Id
                )).ToList()
            ),
            new JobsDto(
                content.JobsEyebrow,
                content.JobsTitle,
                content.JobsText,
                content.JobsPoints.Select(point => point.Value).ToList()
            )
        );

        
    }
    private void AddAudit(string actor, string entity, int entityId, object metadata)
    {
        _db.AuditLogs.Add(new AuditLog
        {
            Actor = actor,
            Action = "Update",
            Entity = entity,
            EntityId = entityId,
            Metadata = JsonDocument.Parse(JsonSerializer.Serialize(metadata)),
            CreatedAt = DateTime.UtcNow
        });
    }
}
