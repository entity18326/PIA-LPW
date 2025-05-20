using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public int? IdUsuario { get; set; }

    public string? Nombre { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Camara { get; set; }

    public string? Pantalla { get; set; }

    public string? Batería { get; set; }

    public string? Caracteristicas { get; set; }

    public string? Imagen { get; set; }

    public int? Visitas { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }

    public virtual ICollection<Noticia> Noticia { get; set; } = new List<Noticia>();
}
