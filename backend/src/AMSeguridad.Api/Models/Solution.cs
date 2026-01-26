using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models
{
    [Table("solutions")]
    public class Solution
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }

        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required] [Column("tag")] public string Tag { get; set; } = string.Empty;
        [Required] [Column("title")] public string Title { get; set; } = string.Empty;
        [Required] [Column("text")] public string Text { get; set; } = string.Empty;
    }
}