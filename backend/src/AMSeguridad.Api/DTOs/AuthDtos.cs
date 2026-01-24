namespace AMSeguridad.Api.DTOs;

public sealed record LoginRequestDto(string Username, string Password);
public sealed record LoginResponseDto(Guid Id, string Username, string DisplayName, string Role);
