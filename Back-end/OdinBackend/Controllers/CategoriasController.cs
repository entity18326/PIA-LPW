using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Context;
using OdinBackend.Models;

namespace OdinBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly LpwPiaContext _context;

        public CategoriasController(LpwPiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategorias()
        {
            try
            {
                var categorias = await _context.Categorias.ToListAsync();
                if (categorias == null || !categorias.Any())
                {
                    return NotFound(new { message = "No se encontraron categorías" });
                }
                return Ok(categorias);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener categorías", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoria(int id)
        {
            try
            {
                var categoria = await _context.Categorias.FindAsync(id);
                if (categoria == null)
                {
                    return NotFound(new { message = "Categoría no encontrada" });
                }
                return Ok(categoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener la categoría", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CrearCategoria([FromBody] Categoria categoria)
        {
            if (categoria == null)
                return BadRequest("La categoría no puede ser nula");
            if (string.IsNullOrEmpty(categoria.Nombre))
                return BadRequest("El nombre de la categoría no puede estar vacío");
            try
            {
                _context.Categorias.Add(categoria);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al crear la categoría", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarCategoria(int id, [FromBody] Categoria categoria)
        {
            if (id != categoria.Id)
                return BadRequest("El ID no coincide");
            if (categoria == null)
                return BadRequest("La categoría no puede ser nula");
            if (string.IsNullOrEmpty(categoria.Nombre))
                return BadRequest("El nombre de la categoría no puede estar vacío");
            try
            {
                _context.Entry(categoria).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CategoriaExists(id))
                    return NotFound(new { message = "Categoría no encontrada" });
                throw;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al actualizar la categoría", error = ex.Message });
            }
        }
        private async Task<bool> CategoriaExists(int id)
        {
            return await _context.Categorias.AnyAsync(c => c.Id == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarCategoria(int id)
        {
            try
            {
                var categoria = await _context.Categorias.FindAsync(id);
                if (categoria == null)
                {
                    return NotFound(new { message = "Categoría no encontrada" });
                }
                _context.Categorias.Remove(categoria);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al eliminar la categoría", error = ex.Message });
            }
        }
    }
}
