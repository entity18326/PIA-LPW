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
    public virtual DbSet<Imagen> Imagenes { get; set; }
    public virtual DbSet<Marcas> Marcas { get; set; }
    public virtual DbSet<EspecificacionesProducto> EspecificacionesProductos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=192.168.0.231;Database=LPW_PIA;User Id=sa;Password=timty288;TrustServerCertificate=True;");

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
            entity.HasKey(e => e.ID_Noticia).HasName("PK__Noticias__58E91D207E6600B4");
            entity.ToTable("Noticias");
            entity.Property(e => e.ID_Noticia)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID_Noticia");
            entity.Property(e => e.Fecha).HasColumnType("date");
            entity.Property(e => e.ID_Producto).HasColumnName("ID_Producto");
            entity.Property(e => e.ID_Usuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.Imagen).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Titulo).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Resumen).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Texto).HasColumnName("Texto").HasColumnType("varchar(MAX)");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            
            entity.HasKey(e => e.ID_Producto);
            entity.ToTable("Productos");

            entity.Property(e => e.ID_Producto)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID_Producto");

            entity.HasOne(e => e.Especificaciones)
                .WithOne(e => e.Producto)
                .HasForeignKey<EspecificacionesProducto>(e => e.ID_Producto);

            entity.Property(e => e.Caracteristicas).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Fecha).HasColumnType("date");
            entity.Property(e => e.Imagen).HasColumnType("varchar(255)");
            entity.Property(e => e.Nombre).HasColumnType("varchar(100)");
            entity.Property(e => e.Slug).HasColumnType("nvarchar(255)");
            entity.Property(e => e.Marca).HasColumnType("nvarchar(255)");
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

        modelBuilder.Entity<Imagen>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("Imagenes");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("Id");
            entity.Property(e => e.NombreArchivo).HasColumnType("nvarchar(255)");
            entity.Property(e => e.Url).HasColumnType("nvarchar(500)");
            entity.Property(e => e.FechaSubida).HasColumnType("datetime");
        });

        modelBuilder.Entity<Marcas>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("Marcas");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("Id");
            entity.Property(e => e.NombreMarca).HasColumnType("nvarchar(255)");
            entity.Property(e => e.descripcion).HasColumnType("nvarchar(500)");
            entity.Property(e => e.logo).HasColumnType("nvarchar(500)");
            entity.Property(e => e.slug).HasColumnType("nvarchar(255)");
        });

        modelBuilder.Entity<EspecificacionesProducto>(entity =>
        {
            entity.HasKey(e => e.ID_Producto); // <- Aquí defines la PK correctamente
            entity.ToTable("EspecificacionesProducto");
            entity.Property(e => e.ID_Producto)
                .ValueGeneratedNever();

            entity.Property(e => e.Pantalla).HasColumnType("varchar(255)").IsRequired(false);
            entity.Property(e => e.Procesador).HasColumnType("varchar(255)").IsRequired(false);
            entity.Property(e => e.RAM).HasColumnType("varchar(100)").IsRequired(false);
            entity.Property(e => e.Almacenamiento).HasColumnType("varchar(100)").IsRequired(false);
            entity.Property(e => e.Camara).HasColumnType("varchar(255)").IsRequired(false);
            entity.Property(e => e.Bateria).HasColumnType("varchar(100)").IsRequired(false);
            entity.Property(e => e.SistemaOperativo).HasColumnType("varchar(100)").IsRequired(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
