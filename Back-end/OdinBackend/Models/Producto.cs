using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Producto
{
    public int ID_Producto { get; set; }
    public string? Nombre { get; set; }
    public DateTime? Fecha { get; set; }
    public string? Caracteristicas { get; set; }
    public string? Imagen { get; set; }
    public string? Slug { get; set; }
    public string? Marca { get; set; }

    public EspecificacionesProducto? Especificaciones { get; set; }
}
