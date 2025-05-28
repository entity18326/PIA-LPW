using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Models;

namespace OdinBackend.Context;

public partial class LpwPiaContext : DbContext
{
    public LpwPiaContext()
    {
    }

    public LpwPiaContext(DbContextOptions<LpwPiaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Estadistica> Estadisticas { get; set; }

    public virtual DbSet<Noticia> Noticias { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=MIGUELLU\\MSSQLSERVER01;Database=LPW_PIA;User Id=apiuser;Password=F8zbVxwVB;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Estadistica>(entity =>
        {
            entity.HasKey(e => e.IdEstadistica).HasName("PK__Estadist__AA8B7E1595CD1459");
            entity.Property(e => e.IdEstadistica)
                .ValueGeneratedNever()
                .HasColumnName("ID_Estadistica");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.IdNoticia).HasColumnName("ID_Noticia");
            entity.Property(e => e.IdProducto).HasColumnName("ID_Producto");
            entity.Property(e => e.Nombre).HasColumnType("varchar(100)");
            entity.Property(e => e.VisitasNoticias).HasColumnName("Visitas_Noticias");
            entity.Property(e => e.VisitasProductos).HasColumnName("Visitas_Productos");
            entity.Property(e => e.VisitasTot).HasColumnName("Visitas_Tot");
        });

        modelBuilder.Entity<Noticia>(entity =>
        {
            entity.HasKey(e => e.IdNoticia).HasName("PK__Noticias__58E91D207E6600B4");
            entity.ToTable("Noticias");
            entity.Property(e => e.IdNoticia)
                .ValueGeneratedNever()
                .HasColumnName("ID_Noticia");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.IdPoducto).HasColumnName("ID_Poducto");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.Imagen).HasColumnType("text");
            entity.Property(e => e.Resumen).HasColumnType("text");
            entity.Property(e => e.Texto).HasColumnName("Texto").HasColumnType("text");
            entity.Property(e => e.Visitas).HasColumnName("Visitas");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ID_Producto);
            entity.ToTable("Productos");
            entity.Property(e => e.ID_Producto)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID_Producto");
            entity.Property(e => e.Bateria).HasColumnType("varchar(100)");
            entity.Property(e => e.Camara).HasColumnType("varchar(100)");
            entity.Property(e => e.Caracteristicas).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.Imagen).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Nombre).HasColumnType("varchar(100)");
            entity.Property(e => e.Pantalla).HasColumnType("varchar(100)");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.ID_Usuario).HasName("PK__Usuarios__DE4431C53FFF7C97");
            entity.ToTable("Usuarios");
            entity.Property(e => e.ID_Usuario)
                .ValueGeneratedNever()
                .HasColumnName("ID_Usuario");
            entity.Property(e => e.Contraseña).HasColumnType("varchar(100)");
            entity.Property(e => e.Nombre).HasColumnType("varchar(100)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
