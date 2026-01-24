using AMSeguridad.Api.Data;
using AMSeguridad.Api.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Services;

public sealed class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly PasswordHasher<Entities.UserAccount> _hasher = new();

    public AuthService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken)
    {
        var username = request.Username.Trim().ToLowerInvariant();
        var user = await _db.UserAccounts.FirstOrDefaultAsync(u => u.Username == username && u.IsActive, cancellationToken);

        if (user is null)
        {
            return null;
        }

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        return new LoginResponseDto(user.Id, user.Username, user.DisplayName, user.Role);
    }
}
