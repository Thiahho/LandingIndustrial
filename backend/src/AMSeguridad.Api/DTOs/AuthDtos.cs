namespace AMSeguridad.Api.DTOs;

public sealed record LoginRequestDto(string Username, string Password);
public sealed record LoginResponseDto(int Id, string Username, string DisplayName, string Role, string Token);

public sealed record RegisterAdminDto(string Username, string Password, string DisplayName);
public sealed record RegisterEmployeeDto(string Username, string Password, string DisplayName);
public sealed record UserResponseDto(int Id, string Username, string DisplayName, string Role, bool IsActive);
