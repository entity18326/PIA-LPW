using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Context;
using OdinBackend.Models;

namespace OdinBackend.Controllers
{
    public class NoticiasController : ControllerBase
    {
        private readonly LpwPiaContext _context;
        public NoticiasController(LpwPiaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNoticia(int id)
        {
            // Simulación de la obtención de una noticia
            var noticia = new { Id = id, Titulo = "Noticia de ejemplo", Contenido = "Contenido de la noticia" };
            return Ok(noticia);
        }

        [HttpPost]
        public async Task<IActionResult> CrearNoticia(Noticia noticia)
        {
            if (noticia == null)
                return BadRequest("La noticia no puede ser nula");
            if (string.IsNullOrEmpty(noticia.Texto))
                return BadRequest("El texto de la noticia no puede estar vacío");
            if (string.IsNullOrEmpty(noticia.Resumen))
                return BadRequest("El resumen de la noticia no puede estar vacío");
            if (noticia.Fecha == null)
                return BadRequest("La fecha de la noticia no puede estar vacía");

            _context.Noticias.Add(noticia);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNoticia), new { id = noticia.IdNoticia}, noticia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarNoticia(int id, Noticia noticia)
        {
            if (id != noticia.IdNoticia)
                return BadRequest("El ID no coincide");
            if (string.IsNullOrEmpty(noticia.Texto))
                return BadRequest("El texto de la noticia no puede estar vacío");
            if (string.IsNullOrEmpty(noticia.Resumen))
                return BadRequest("El resumen de la noticia no puede estar vacío");
            if (noticia.Fecha == null)
                return BadRequest("La fecha de la noticia no puede estar vacía");
            _context.Entry(noticia).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Noticias.Any(e => e.IdNoticia == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarNoticia(int id)
        {
            var noticia = await _context.Noticias.FindAsync(id);
            if (noticia == null)
                return NotFound();
            _context.Noticias.Remove(noticia);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
