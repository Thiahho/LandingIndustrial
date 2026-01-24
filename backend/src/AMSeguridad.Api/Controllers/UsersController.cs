using AMSeguridad.Api.Data;
using AMSeguridad.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Controllers;

[ApiController]
[Route("api/users")]
public sealed class UsersController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly PasswordHasher<UserAccount> _hasher = new();

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult> Get(CancellationToken cancellationToken)
    {
        var users = await _db.UserAccounts
            .AsNoTracking()
            .Select(user => new
            {
                user.Id,
                user.Username,
                user.DisplayName,
                user.Role,
                user.IsActive
            })
            .ToListAsync(cancellationToken);

        return Ok(users);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] UserAccount request, CancellationToken cancellationToken)
    {
        var username = request.Username.Trim().ToLowerInvariant();
        if (await _db.UserAccounts.AnyAsync(u => u.Username == username, cancellationToken))
        {
            return Conflict(new { message = "Usuario ya existente." });
        }

        var user = new UserAccount
        {
            Id = Guid.NewGuid(),
            Username = username,
            DisplayName = request.DisplayName,
            Role = request.Role,
            IsActive = true
        };

        user.PasswordHash = _hasher.HashPassword(user, request.PasswordHash);

        _db.UserAccounts.Add(user);
        await _db.SaveChangesAsync(cancellationToken);

        return Ok(new { user.Id, user.Username, user.DisplayName, user.Role });
    }

    [HttpPut("{id:guid}/status")]
    public async Task<ActionResult> UpdateStatus(Guid id, [FromBody] bool isActive, CancellationToken cancellationToken)
    {
        var user = await _db.UserAccounts.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user is null) return NotFound();

        user.IsActive = isActive;
        await _db.SaveChangesAsync(cancellationToken);

        return Ok();
    }
}
