using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AMSeguridad.Api.Models
{
    [Table("service_items")]
    public class ServiceItem
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("service_id")]
        public int ServiceId { get; set; }

        [ForeignKey("ServiceId")]
        public virtual Service? Service { get; set; }

        [Required]
        [Column("value")]
        public string Value { get; set; } = string.Empty;

        [Column("descripcion")]
        public string? Descripcion {get;set;} = string.Empty;
    }
}