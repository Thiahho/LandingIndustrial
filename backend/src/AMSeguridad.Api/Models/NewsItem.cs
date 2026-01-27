using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models
{
    [Table("news_items")]
    public class NewsItem
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }

        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required] [Column("date")] public string Date { get; set; } = string.Empty; // SQL dice TEXT
        [Required] [Column("title")] public string Title { get; set; } = string.Empty;
        [Required] [Column("text")] public string Text { get; set; } = string.Empty;
        
        [Column("image_public_id")]
        public string? ImagePublicId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}