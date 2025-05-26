using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OdinBackend.Context;
using OdinBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.ID_Usuario }, usuario);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Auth login)
        {
            // Buscar al usuario por nombre de usuario
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Nombre.Equals(login.Username));

            if (usuario == null)
                return Unauthorized("Usuario no encontrado");

            // Validar la contraseña (asumiendo que está en texto plano, aunque lo ideal es encriptarla)
            if (usuario.Contraseña != login.Password)
                return Unauthorized("Contraseña incorrecta");
                
            // Crear claims (datos dentro del token)
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.ID_Usuario.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nombre),
                new Claim("NombreCompleto", usuario.Nombre ?? "")
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("12345678901234567890123456789012345678901234567890"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // Opcional: aquí podrías generar un token JWT o devolver info del usuario

            return Ok(new
            {
                token = tokenString,
                mensaje = "Login exitoso",
                usuario = new
                {
                    usuario.ID_Usuario,
                    usuario.Nombre
                }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, Usuario usuario)
        {
            if (id != usuario.ID_Usuario)
                return BadRequest("El ID no coincide");
            _context.Entry(usuario).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Usuarios.Any(e => e.ID_Usuario == id))
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
