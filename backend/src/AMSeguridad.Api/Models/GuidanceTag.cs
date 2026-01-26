using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.src.AMSeguridad.Api.Models
{
    [Table("guidance_tags")]
    public class GuidanceTag
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }
        
        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required]
        [Column("value")]
        public string Value { get; set; } = string.Empty;
    }
}