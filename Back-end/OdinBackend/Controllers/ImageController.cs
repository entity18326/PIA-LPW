using Microsoft.AspNetCore.Mvc;
using OdinBackend.Context;
using OdinBackend.Models;
using System;

namespace OdinBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly LpwPiaContext _context;

        public ImageController(IWebHostEnvironment env, LpwPiaContext context)
        {
            _env = env;
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("Archivo no válido");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                var extension = Path.GetExtension(file.FileName).ToLower();

                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Extensión no permitida.");

                var folderPath = Path.Combine(_env.WebRootPath, "images");
                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var fileName = Guid.NewGuid().ToString() + extension;
                var fullPath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var url = $"{Request.Scheme}://{Request.Host}/images/{fileName}";

                var imagen = new Imagen
                {
                    NombreArchivo = fileName,
                    Url = url,
                    FechaSubida = DateTime.UtcNow
                };

                _context.Imagenes.Add(imagen);
                await _context.SaveChangesAsync();

                return Ok(new { imagen.Id, imagen.Url });
            } catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al subir la imagen", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImageInfo(int id)
        {
            var imagen = await _context.Imagenes.FindAsync(id);
            if (imagen == null)
                return NotFound();

            return Ok(imagen);
        }
    }
}
