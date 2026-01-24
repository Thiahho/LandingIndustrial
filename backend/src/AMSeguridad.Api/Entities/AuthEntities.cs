using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AMSeguridad.Api.Entities;

[Table("user_accounts")]
public sealed class UserAccount
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("username")]
    public string Username { get; set; } = string.Empty;

    [Column("password_hash")]
    public string PasswordHash { get; set; } = string.Empty;

    [Column("display_name")]
    public string DisplayName { get; set; } = string.Empty;

    [Column("role")]
    public string Role { get; set; } = "empleado";

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("created_at")]
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

[Table("audit_logs")]
public sealed class AuditLog
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("actor")]
    public string Actor { get; set; } = string.Empty;

    [Column("action")]
    public string Action { get; set; } = string.Empty;

    [Column("entity")]
    public string Entity { get; set; } = string.Empty;

    [Column("entity_id")]
    public int? EntityId { get; set; }

    [Column("metadata")]
    public string? Metadata { get; set; }

    [Column("created_at")]
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
