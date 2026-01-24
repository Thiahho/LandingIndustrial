using AMSeguridad.Api.DTOs;

namespace AMSeguridad.Api.Services;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken);
    Task<UserResponseDto?> RegisterAdminAsync(RegisterAdminDto request, CancellationToken cancellationToken);
    Task<UserResponseDto?> RegisterEmployeeAsync(RegisterEmployeeDto request, CancellationToken cancellationToken);
    Task<bool> AdminExistsAsync(CancellationToken cancellationToken);
}
