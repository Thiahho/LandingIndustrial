using AMSeguridad.Api.DTOs;

namespace AMSeguridad.Api.Services;

public interface ILandingContentService
{
    Task<LandingContentDto> GetAsync(CancellationToken cancellationToken);
    Task<LandingContentDto> UpdateAsync(LandingContentDto dto, string actor, CancellationToken cancellationToken);
}
