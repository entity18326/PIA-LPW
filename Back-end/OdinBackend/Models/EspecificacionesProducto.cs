using System.Text.Json.Serialization;

namespace OdinBackend.Models
{
    public class EspecificacionesProducto
    {
        public int ID_Producto { get; set; }
        public string? Pantalla { get; set; }
        public string? Procesador { get; set; }
        public string? RAM { get; set; }
        public string? Almacenamiento { get; set; }
        public string? Camara { get; set; }
        public string? Bateria { get; set; }
        public string? SistemaOperativo { get; set; }

        [JsonIgnore]
        public Producto? Producto { get; set; }
    }
}
