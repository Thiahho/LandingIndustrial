using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models
{
    [Table("technology_items")]
    public class TechnologyItem
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }

        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required] [Column("title")] public string Title { get; set; } = string.Empty;
        [Required] [Column("text")] public string Text { get; set; } = string.Empty;
        [Required] [Column("meta")] public string Meta { get; set; } = string.Empty;
        
        [Column("image_url")] 
        public string? ImageUrl { get; set; }
    }
}