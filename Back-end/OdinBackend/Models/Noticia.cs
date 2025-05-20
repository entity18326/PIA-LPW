using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Noticia
{
    public int IdNoticia { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdPoducto { get; set; }

    public string? Imagen { get; set; }

    public DateTime? Fecha { get; set; }

    public string? Texto { get; set; }

    public string? Resumen { get; set; }

    public int? Visitas { get; set; }

    public virtual Producto? IdPoductoNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
