using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models
{
    [Table("product_items")]
    public class Products
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("landing_content_id")]
        public int LandingContentId { get; set; }

        [ForeignKey("LandingContentId")]
        public virtual LandingContent? LandingContent { get; set; }

        [Required] [Column("name")] public string Name { get; set; } = string.Empty;
        [Required] [Column("category")] public string Category { get; set; } = string.Empty;
        [Required] [Column("description")] public string Description { get; set; } = string.Empty;
        
        [Column("image_url")] 
        public string? ImageUrl { get; set; }
    }
}