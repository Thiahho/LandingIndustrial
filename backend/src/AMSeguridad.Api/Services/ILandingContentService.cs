using AMSeguridad.Api.DTOs;

namespace AMSeguridad.Api.Services;

public interface ILandingContentService
{
    Task<LandingContentDto> GetAsync(CancellationToken cancellationToken);
    Task<LandingContentDto> UpdateAsync(LandingContentDto dto, string actor, CancellationToken cancellationToken);

    // Métodos de actualización por sección
    Task<HeroDto> UpdateHeroAsync(HeroUpdateDto dto, string actor, CancellationToken ct);
    Task<GuidanceDto> UpdateGuidanceAsync(GuidanceUpdateDto dto, string actor, CancellationToken ct);
    Task<List<ServiceItemDto>> UpdateServicesAsync(ServicesUpdateDto dto, string actor, CancellationToken ct);
    Task<List<SolutionItemDto>> UpdateSolutionsAsync(SolutionsUpdateDto dto, string actor, CancellationToken ct);
    Task<List<TechnologyItemDto>> UpdateTechnologyAsync(TechnologyUpdateDto dto, string actor, CancellationToken ct);
    Task<List<ProductItemDto>> UpdateProductsAsync(ProductsUpdateDto dto, string actor, CancellationToken ct);
    Task<List<CompanyMetricDto>> UpdateCompanyAsync(CompanyUpdateDto dto, string actor, CancellationToken ct);
    Task<List<NewsItemDto>> UpdateNewsAsync(NewsUpdateDto dto, string actor, CancellationToken ct);
    Task<ContactDto> UpdateContactAsync(ContactUpdateDto dto, string actor, CancellationToken ct);
    Task<JobsDto> UpdateJobsAsync(JobsUpdateDto dto, string actor, CancellationToken ct);
}
