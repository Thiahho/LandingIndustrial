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

    public async Task<LandingContentDto> GetAsync(CancellationToken cancellationToken)
    {
        // Usamos CancellationToken.None para evitar cancelar la query si el cliente se desconecta
        // (común en React StrictMode que monta/desmonta componentes en desarrollo)
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
            await _db.SaveChangesAsync(CancellationToken.None);
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
            Metadata = "Actualización completa desde panel admin",
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
}
