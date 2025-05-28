using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Producto
{
    public int ID_Producto { get; set; }

    public string? Nombre { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Camara { get; set; }

    public string? Pantalla { get; set; }

    public string? Bateria { get; set; }

    public string? Caracteristicas { get; set; }

    public string? Imagen { get; set; }

}
