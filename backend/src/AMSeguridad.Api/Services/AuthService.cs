using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AMSeguridad.Api.Data;
using AMSeguridad.Api.DTOs;
using AMSeguridad.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AMSeguridad.Api.Services;

public sealed class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<UserAccount> _hasher = new();

    public AuthService(AppDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
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

        var token = GenerateJwtToken(user);
        return new LoginResponseDto(user.Id, user.Username, user.DisplayName, user.Role, token);
    }

    public async Task<UserResponseDto?> RegisterAdminAsync(RegisterAdminDto request, CancellationToken cancellationToken)
    {
        var username = request.Username.Trim().ToLowerInvariant();

        if (await _db.UserAccounts.AnyAsync(u => u.Username == username, cancellationToken))
        {
            return null;
        }

        var user = new UserAccount
        {
            Username = username,
            DisplayName = request.DisplayName,
            Role = "admin",
            IsActive = true,
            CreatedAt = DateTimeOffset.UtcNow
        };

        user.PasswordHash = _hasher.HashPassword(user, request.Password);

        _db.UserAccounts.Add(user);
        await _db.SaveChangesAsync(cancellationToken);

        return new UserResponseDto(user.Id, user.Username, user.DisplayName, user.Role, user.IsActive);
    }

    public async Task<UserResponseDto?> RegisterEmployeeAsync(RegisterEmployeeDto request, CancellationToken cancellationToken)
    {
        var username = request.Username.Trim().ToLowerInvariant();

        if (await _db.UserAccounts.AnyAsync(u => u.Username == username, cancellationToken))
        {
            return null;
        }

        var user = new UserAccount
        {
            Username = username,
            DisplayName = request.DisplayName,
            Role = "empleado",
            IsActive = true,
            CreatedAt = DateTimeOffset.UtcNow
        };

        user.PasswordHash = _hasher.HashPassword(user, request.Password);

        _db.UserAccounts.Add(user);
        await _db.SaveChangesAsync(cancellationToken);

        return new UserResponseDto(user.Id, user.Username, user.DisplayName, user.Role, user.IsActive);
    }

    public async Task<bool> AdminExistsAsync(CancellationToken cancellationToken)
    {
        return await _db.UserAccounts.AnyAsync(u => u.Role == "admin", cancellationToken);
    }

    private string GenerateJwtToken(UserAccount user)
    {
        var jwtKey = _configuration["Jwt:Key"]!;
        var jwtIssuer = _configuration["Jwt:Issuer"]!;
        var jwtAudience = _configuration["Jwt:Audience"]!;
        var expireMinutes = int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "480");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(ClaimTypes.Name, user.DisplayName),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
