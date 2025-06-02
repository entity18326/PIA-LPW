using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Context;
using OdinBackend.Models;

namespace OdinBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarcasController : ControllerBase
    {
        private readonly LpwPiaContext _context;
        public MarcasController(LpwPiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMarcas()
        {
            try
            {
                var marcas = await _context.Marcas.ToListAsync();
                if (marcas == null || !marcas.Any())
                {
                    return NotFound(new { message = "No se encontraron marcas" });
                }
                return Ok(marcas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener marcas", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMarca(int id)
        {
            try
            {
                var marca = await _context.Marcas.FindAsync(id);
                if (marca == null)
                {
                    return NotFound(new { message = "Marca no encontrada" });
                }
                return Ok(marca);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener la marca", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CrearMarca(Marcas marca)
        {
            if (marca == null)
                return BadRequest("La marca no puede ser nula");
            if (string.IsNullOrEmpty(marca.NombreMarca))
                return BadRequest("El nombre de la marca no puede estar vacío");
            try
            {
                _context.Marcas.Add(marca);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetMarca), new { id = marca.Id }, marca);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al crear la marca", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarMarca(int id)
        {
            try
            {
                var marca = await _context.Marcas.FindAsync(id);
                if (marca == null)
                {
                    return NotFound(new { message = "Marca no encontrada" });
                }
                _context.Marcas.Remove(marca);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al eliminar la marca", error = ex.Message });
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarMarca(int id)
        {
            var marca = await _context.Marcas.FindAsync(id);
            try
            {
                if (marca == null)
                    return NotFound(new { message = "Marca no encontrada" });

                _context.Entry(marca).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Marcas.Any(e => e.Id == marca.Id))
                    return NotFound(new { message = "Marca no encontrada" });
                else
                    throw;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al actualizar la marca", error = ex.Message });
            }
        }
    }
}
