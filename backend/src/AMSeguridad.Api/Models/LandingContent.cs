using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models;

[Table("landing_contents")]
public class LandingContent
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    // Hero Section
    [Required] [Column("hero_eyebrow")] public string HeroEyebrow { get; set; } = string.Empty;
    [Required] [Column("hero_title")] public string HeroTitle { get; set; } = string.Empty;
    [Required] [Column("hero_lead")] public string HeroLead { get; set; } = string.Empty;
    [Required] [Column("hero_primary_cta")] public string HeroPrimaryCta { get; set; } = string.Empty;
    [Required] [Column("hero_secondary_cta")] public string HeroSecondaryCta { get; set; } = string.Empty;
    [Required] [Column("hero_contact_cta")] public string HeroContactCta { get; set; } = string.Empty;
    [Required] [Column("hero_image_url")] public string HeroImageUrl { get; set; } = string.Empty;

    // Guidance Section
    [Required] [Column("guidance_eyebrow")] public string GuidanceEyebrow { get; set; } = string.Empty;
    [Required] [Column("guidance_title")] public string GuidanceTitle { get; set; } = string.Empty;
    [Required] [Column("guidance_text")] public string GuidanceText { get; set; } = string.Empty;

    // Contact Section
    [Required] [Column("contact_eyebrow")] public string ContactEyebrow { get; set; } = string.Empty;
    [Required] [Column("contact_title")] public string ContactTitle { get; set; } = string.Empty;
    [Required] [Column("contact_text")] public string ContactText { get; set; } = string.Empty;
    [Required] [Column("contact_whatsapp")] public string ContactWhatsapp { get; set; } = string.Empty;
    [Required] [Column("contact_commercial_email")] public string ContactCommercialEmail { get; set; } = string.Empty;

    // Jobs Section
    [Required] [Column("jobs_eyebrow")] public string JobsEyebrow { get; set; } = string.Empty;
    [Required] [Column("jobs_title")] public string JobsTitle { get; set; } = string.Empty;
    [Required] [Column("jobs_text")] public string JobsText { get; set; } = string.Empty;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    public List<HeroHighlight> HeroHighlights { get; set; } = [];
    public List<GuidanceTag> GuidanceTags { get; set; } = [];
    public List<Service> Services { get; set; } = [];
    public List<Solution> Solutions { get; set; } = [];
    public List<TechnologyItem> Technology { get; set; } = [];
    public List<Products> Products { get; set; } = [];
    public List<CompanyMetric> CompanyMetrics { get; set; } = [];
    public List<NewsItem> News { get; set; } = [];
    public List<ContactChannel> ContactChannels { get; set; } = [];
    public List<Resource> Resources { get; set; } = [];
    public List<JobsPoint> JobsPoints { get; set; } = [];
}
