using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OdinBackend.Context;
using System;

var builder = WebApplication.CreateBuilder(args);

// Conexión a SQL Server (usa tu cadena real aquí)
builder.Services.AddDbContext<LpwPiaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar controladores
builder.Services.AddControllers();

// Swagger para documentación de la API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Mi API", Version = "v1" });
});

// En ConfigureServices
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // URL de tu app React en desarrollo
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Middleware de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seguridad HTTPS y enrutamiento
app.UseHttpsRedirection();

// En Configure
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
