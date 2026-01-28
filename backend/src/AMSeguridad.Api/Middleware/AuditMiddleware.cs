using System.Text.Json;
using AMSeguridad.Api.Data;
using AMSeguridad.Api.Models;

namespace AMSeguridad.Api.Middleware;

public sealed class AuditMiddleware
{
    private readonly RequestDelegate _next;

    public AuditMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, AppDbContext db)
    {
        await _next(context);

        if (!HttpMethods.IsPost(context.Request.Method) &&
            !HttpMethods.IsPut(context.Request.Method) &&
            !HttpMethods.IsDelete(context.Request.Method))
        {
            return;
        }

        var actor = context.Request.Headers["X-User"].ToString();
        if (string.IsNullOrWhiteSpace(actor))
        {
            actor = "sistema";
        }

        var audit = new AuditLog
        {
            Actor = actor,
            Action = context.Request.Method,
            Entity = context.Request.Path.Value ?? "unknown",
            EntityId = null,
            Metadata = JsonDocument.Parse(JsonSerializer.Serialize(new
            {
                StatusCode = context.Response.StatusCode,
                Path = context.Request.Path.Value,
                TraceId = context.TraceIdentifier
            })),
            CreatedAt = DateTime.UtcNow
        };

        db.AuditLogs.Add(audit);
        await db.SaveChangesAsync();
    }
}
