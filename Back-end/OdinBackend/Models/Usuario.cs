using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OdinBackend.Models;

public partial class Usuario
{
    [Column("ID_Usuario")]
    public int ID_Usuario { get; set; }

    public string? Nombre { get; set; }

    public string? Contraseña { get; set; }

    [Column("ID_Rol")]
    public int? ID_Rol { get; set; }

    //public virtual ICollection<Noticia> Noticia { get; set; } = new List<Noticia>();

}
