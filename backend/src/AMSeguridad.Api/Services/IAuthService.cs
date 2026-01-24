using AMSeguridad.Api.DTOs;

namespace AMSeguridad.Api.Services;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken);
}
