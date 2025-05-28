using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Noticia
{
    public int ID_Noticia { get; set; }

    public int? ID_Usuario { get; set; }

    public int? ID_Producto { get; set; }

    public string? Imagen { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Texto { get; set; }

    public string? Resumen { get; set; }
    public string? Titulo { get; set; }

}
