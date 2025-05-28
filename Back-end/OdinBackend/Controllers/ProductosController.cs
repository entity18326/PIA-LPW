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
        public async Task<IActionResult> CrearProducto(Producto productoDto)
        {
            try
            {
                if (productoDto == null)
                {
                    return BadRequest(new { message = "Datos del producto son requeridos" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var producto = new Producto
                {
                    Nombre = productoDto.Nombre,
                    Fecha = DateTime.Now.Date,
                    Camara = productoDto.Camara,
                    Pantalla = productoDto.Pantalla,
                    Bateria = productoDto.Bateria,
                    Caracteristicas = productoDto.Caracteristicas,
                    Imagen = productoDto.Imagen
                };

                _context.Productos.Add(producto);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProducto), new { id = producto.ID_Producto }, producto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al crear producto", error = ex.InnerException.Message });
            }
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
}
