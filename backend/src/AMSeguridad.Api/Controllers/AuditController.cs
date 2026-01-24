using AMSeguridad.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMSeguridad.Api.Controllers;

[ApiController]
[Route("api/audit")]
public sealed class AuditController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuditController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult> Get([FromQuery] int take = 50, CancellationToken cancellationToken = default)
    {
        var logs = await _db.AuditLogs
            .OrderByDescending(log => log.CreatedAt)
            .Take(Math.Clamp(take, 1, 200))
            .ToListAsync(cancellationToken);

        return Ok(logs);
    }
}
