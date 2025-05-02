CREATE TABLE Usuarios (
  ID_Usuario INT,
  Nombre TEXT,
  Contraseña TEXT,
  Rol INT,
  PRIMARY KEY (ID_Usuario)
);

CREATE TABLE Productos (
  ID_Producto INT,
  ID_Usuario INT,
  Nombre TEXT,
  Fecha DATETIME,
  Camara TEXT,
  Pantalla TEXT,
  Batería TEXT,
  Caracteristicas TEXT,
  Imagen TEXT,
  Visitas INT,
  PRIMARY KEY (ID_Producto),
  FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

CREATE TABLE Estadisticas (
  ID_Estadistica INT,
  Visitas_Noticias INT,
  ID_Producto INT,
  Visitas_Productos INT,
  ID_Noticia INT,
  Nombre TEXT,
  Fecha DATETIME,
  Visitas_Tot INT,
  PRIMARY KEY (ID_Estadistica)
);

CREATE TABLE Noticias (
  ID_Noticia INT,
  ID_Usuario INT,
  ID_Poducto INT,
  Imagen TEXT,
  Fecha DATETIME,
  Texto TEXT,
  Resumen TEXT,
  VIsitas INT,
  PRIMARY KEY (ID_Noticia),
  FOREIGN KEY (ID_Poducto) REFERENCES Productos(ID_Producto),
  FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

