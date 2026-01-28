using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace AMSeguridad.Api.Models
{
    [Table("audit_logs")]
    public class AuditLog
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("actor")]
        public string Actor { get; set; } = string.Empty;

        [Required]
        [Column("action")]
        public string Action { get; set; } = string.Empty;

        [Required]
        [Column("entity")]
        public string Entity { get; set; } = string.Empty;

        [Column("entity_id")]
        public int? EntityId { get; set; }

        // Mapeado como string para JSONB, o puedes usar JsonDocument
        [Column("metadata", TypeName = "jsonb")]
        public JsonDocument? Metadata { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}