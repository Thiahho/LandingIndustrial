using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.src.AMSeguridad.Api.Models
{
    [Table("company_metrics")]
    public class CompanyMetric
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }

        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required] [Column("value")] public string Value { get; set; } = string.Empty;
        [Required] [Column("label")] public string Label { get; set; } = string.Empty;
        [Required] [Column("text")] public string Text { get; set; } = string.Empty;
    }
}