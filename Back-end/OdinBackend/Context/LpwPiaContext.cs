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
            entity.HasKey(e => e.IdNoticia).HasName("PK__Noticias__58E91D207E6600B4");

            entity.Property(e => e.IdNoticia)
                .ValueGeneratedNever()
                .HasColumnName("ID_Noticia");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.IdPoducto).HasColumnName("ID_Poducto");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.Imagen).HasColumnType("text");
            entity.Property(e => e.Resumen).HasColumnType("text");
            entity.Property(e => e.Texto).HasColumnType("text");
            entity.Property(e => e.Visitas).HasColumnName("Visitas");

            entity.HasOne(d => d.IdPoductoNavigation).WithMany(p => p.Noticia)
                .HasForeignKey(d => d.IdPoducto)
                .HasConstraintName("FK__Noticias__ID_Pod__3E52440B");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Noticia)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Noticias__ID_Usu__3F466844");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK__Producto__9B4120E25D1D5D51");

            entity.Property(e => e.IdProducto)
                .ValueGeneratedNever()
                .HasColumnName("ID_Producto");
            entity.Property(e => e.Batería).HasColumnType("varchar(100)");
            entity.Property(e => e.Camara).HasColumnType("varchar(100)");
            entity.Property(e => e.Caracteristicas).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.Imagen).HasColumnType("varchar(MAX)");
            entity.Property(e => e.Nombre).HasColumnType("varchar(100)");
            entity.Property(e => e.Pantalla).HasColumnType("varchar(100)");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Productos__ID_Us__398D8EEE");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.ID_Usuario).HasName("PK__Usuarios__DE4431C53FFF7C97");

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
