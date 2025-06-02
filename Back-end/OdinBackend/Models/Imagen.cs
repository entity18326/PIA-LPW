namespace OdinBackend.Models
{
    public class Imagen
    {
        public int Id { get; set; }
        public string NombreArchivo { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public DateTime FechaSubida { get; set; }
    }
}
