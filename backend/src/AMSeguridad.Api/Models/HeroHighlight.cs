using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.src.AMSeguridad.Api.Models
{
    [Table("hero_highlights")]
    public class HeroHighlight
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }

        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required]
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [Column("text")]
        public string Text { get; set; } = string.Empty;
    }
}