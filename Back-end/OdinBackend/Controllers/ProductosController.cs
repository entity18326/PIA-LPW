using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Context;
using OdinBackend.Models;
using System;

namespace OdinBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase // Fix: Inherit from ControllerBase to properly use IActionResult  
    {
        private readonly LpwPiaContext _context;

        public ProductosController(LpwPiaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProducto(int id) // Fix: Change return type to IActionResult  
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();

            return Ok(producto); // Fix: Wrap the result in Ok() to return IActionResult
        }

        [HttpGet]
        public async Task<IActionResult> GetProductos()
        {
            try
            {
                var productos = await _context.Productos.ToListAsync();

                if (productos == null || !productos.Any())
                {
                    return NotFound(new { message = "No se encontraron productos" });
                }

                return Ok(productos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener productos", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CrearProductoConEspecificaciones([FromBody] ProductoConEspecificacionesDto dto)
        {
            var producto = new Producto
            {
                Nombre = dto.Nombre,
                Fecha = dto.Fecha,
                Caracteristicas = dto.Caracteristicas,
                Imagen = dto.Imagen,
                Slug = dto.Slug,
                Marca = dto.Marca
            };

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync(); // Se necesita para obtener el ID_Producto

            if (dto.Especificaciones != null)
            {
                var especificaciones = new EspecificacionesProducto
                {
                    ID_Producto = producto.ID_Producto,
                    Pantalla = dto.Especificaciones.Pantalla,
                    Procesador = dto.Especificaciones.Procesador,
                    RAM = dto.Especificaciones.RAM,
                    Almacenamiento = dto.Especificaciones.Almacenamiento,
                    Camara = dto.Especificaciones.Camara,
                    Bateria = dto.Especificaciones.Bateria,
                    SistemaOperativo = dto.Especificaciones.SistemaOperativo
                };

                _context.EspecificacionesProductos.Add(especificaciones);
                await _context.SaveChangesAsync();
            }

            return Ok(new { 
                producto.ID_Producto,
                producto.Nombre,
                producto.Especificaciones
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarProducto(int id, Producto producto)
        {
            if (id != producto.ID_Producto)
                return BadRequest("El ID no coincide");

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Productos.Any(e => e.ID_Producto == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class ProductoConEspecificacionesDto
    {
        public string? Nombre { get; set; }
        public DateTime? Fecha { get; set; }
        public string? Caracteristicas { get; set; }
        public string? Imagen { get; set; }
        public string? Slug { get; set; }
        public string? Marca { get; set; }

        public EspecificacionesDto? Especificaciones { get; set; }
    }

    public class EspecificacionesDto
    {
        public string? Pantalla { get; set; }
        public string? Procesador { get; set; }
        public string? RAM { get; set; }
        public string? Almacenamiento { get; set; }
        public string? Camara { get; set; }
        public string? Bateria { get; set; }
        public string? SistemaOperativo { get; set; }
    }

}
