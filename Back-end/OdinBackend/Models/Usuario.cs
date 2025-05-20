using System;
using System.Collections.Generic;

namespace OdinBackend.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string? Nombre { get; set; }

    public string? Contraseña { get; set; }

    public int? Rol { get; set; }

    public virtual ICollection<Noticia> Noticia { get; set; } = new List<Noticia>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
