using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OdinBackend.Context;
using OdinBackend.Models;
using OdinBackend.Services;
using System;
using System.Security.Claims;

namespace OdinBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly LpwPiaContext _context;

        public AuthController(LpwPiaContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] Auth credentials)
        {
            // Aquí iría validación contra base de datos
            // Buscar al usuario por nombre de usuario
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Nombre.Equals(credentials.Username));

            if (usuario == null || usuario.Contraseña != credentials.Password)
            {
                return Unauthorized(new { success = false, mensaje = "Credenciales inválidas" });
            }

            // Generar token JWT
            var token = _jwtService.GenerateToken(usuario);


            return Ok(new
            {
                success = true,
                token,
                usuario = new
                {
                    usuario.ID_Usuario,
                    usuario.Nombre,
                    usuario.ID_Rol
                }
            });
        }

        [HttpGet("me")]
        [Authorize]
        public IActionResult GetUsuario()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null || !identity.IsAuthenticated)
                return Unauthorized();

            var usuario = new
            {
                ID_Usuario = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                Nombre = identity.FindFirst(ClaimTypes.Name)?.Value,
                ID_Rol = identity.FindFirst(ClaimTypes.Role)?.Value
            };

            return Ok(new { success = true, usuario });
        }
    }
}
