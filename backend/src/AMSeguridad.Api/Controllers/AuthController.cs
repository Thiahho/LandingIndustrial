using AMSeguridad.Api.DTOs;
using AMSeguridad.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMSeguridad.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Login - Devuelve token JWT
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto request, CancellationToken cancellationToken)
    {
        var response = await _authService.LoginAsync(request, cancellationToken);
        if (response is null)
        {
            return Unauthorized(new { message = "Credenciales inválidas." });
        }

        return Ok(response);
    }

    /// <summary>
    /// Registro de Admin - Solo via Postman (sin vista)
    /// Solo se permite crear un admin si no existe ninguno
    /// </summary>
    [HttpPost("register/admin")]
    public async Task<ActionResult<UserResponseDto>> RegisterAdmin([FromBody] RegisterAdminDto request, CancellationToken cancellationToken)
    {
        // Verificar si ya existe un admin
        if (await _authService.AdminExistsAsync(cancellationToken))
        {
            return BadRequest(new { message = "Ya existe un administrador registrado. Contacte al administrador existente." });
        }

        var response = await _authService.RegisterAdminAsync(request, cancellationToken);
        if (response is null)
        {
            return Conflict(new { message = "El nombre de usuario ya existe." });
        }

        return Ok(new { message = "Admin creado exitosamente.", user = response });
    }

    /// <summary>
    /// Registro de Empleado - Solo Admin autenticado puede crear empleados
    /// </summary>
    [Authorize(Roles = "admin")]
    [HttpPost("register/employee")]
    public async Task<ActionResult<UserResponseDto>> RegisterEmployee([FromBody] RegisterEmployeeDto request, CancellationToken cancellationToken)
    {
        var response = await _authService.RegisterEmployeeAsync(request, cancellationToken);
        if (response is null)
        {
            return Conflict(new { message = "El nombre de usuario ya existe." });
        }

        return Ok(new { message = "Empleado creado exitosamente.", user = response });
    }
}
