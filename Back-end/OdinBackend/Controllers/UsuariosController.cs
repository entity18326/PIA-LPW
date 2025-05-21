using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Context;
using OdinBackend.Models;

namespace OdinBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly LpwPiaContext _context;
        public UsuariosController(LpwPiaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound();
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> CrearUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, Usuario usuario)
        {
            if (id != usuario.IdUsuario)
                return BadRequest("El ID no coincide");
            _context.Entry(usuario).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Usuarios.Any(e => e.IdUsuario == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound();
            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
