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

        [HttpPost]
        public async Task<IActionResult> CrearProducto(Producto producto) // Fix: Change return type to IActionResult  
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.IdProducto }, producto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarProducto(int id, Producto producto)
        {
            if (id != producto.IdProducto)
                return BadRequest("El ID no coincide");

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Productos.Any(e => e.IdProducto == id))
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
