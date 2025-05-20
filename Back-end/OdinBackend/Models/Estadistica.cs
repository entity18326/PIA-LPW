using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Estadistica
{
    public int IdEstadistica { get; set; }

    public int? VisitasNoticias { get; set; }

    public int? IdProducto { get; set; }

    public int? VisitasProductos { get; set; }

    public int? IdNoticia { get; set; }

    public string? Nombre { get; set; }

    public DateTime? Fecha { get; set; }

    public int? VisitasTot { get; set; }
}
