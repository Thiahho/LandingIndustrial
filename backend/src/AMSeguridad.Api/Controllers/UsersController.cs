using AMSeguridad.Api.Data;
using AMSeguridad.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Roles = "admin")]
public sealed class UsersController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Listar todos los usuarios - Solo Admin
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserResponseDto>>> Get(CancellationToken cancellationToken)
    {
        var users = await _db.UserAccounts
            .AsNoTracking()
            .Select(user => new UserResponseDto(
                user.Id,
                user.Username,
                user.DisplayName,
                user.Role,
                user.IsActive
            ))
            .ToListAsync(cancellationToken);

        return Ok(users);
    }

    /// <summary>
    /// Obtener usuario por ID - Solo Admin
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserResponseDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var user = await _db.UserAccounts
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        if (user is null) return NotFound(new { message = "Usuario no encontrado." });

        return Ok(new UserResponseDto(user.Id, user.Username, user.DisplayName, user.Role, user.IsActive));
    }

    /// <summary>
    /// Activar/Desactivar usuario - Solo Admin
    /// </summary>
    [HttpPut("{id:int}/status")]
    public async Task<ActionResult> UpdateStatus(int id, [FromBody] bool isActive, CancellationToken cancellationToken)
    {
        var user = await _db.UserAccounts.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user is null) return NotFound(new { message = "Usuario no encontrado." });

        user.IsActive = isActive;
        await _db.SaveChangesAsync(cancellationToken);

        return Ok(new { message = isActive ? "Usuario activado." : "Usuario desactivado." });
    }

    /// <summary>
    /// Eliminar usuario - Solo Admin (no puede eliminarse a sí mismo)
    /// </summary>
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (currentUserId == id.ToString())
        {
            return BadRequest(new { message = "No puede eliminarse a sí mismo." });
        }

        var user = await _db.UserAccounts.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user is null) return NotFound(new { message = "Usuario no encontrado." });

        _db.UserAccounts.Remove(user);
        await _db.SaveChangesAsync(cancellationToken);

        return Ok(new { message = "Usuario eliminado." });
    }
}
