export interface Productos {
  iD_Producto: number;
  nombre: string;
  fecha: string;
  caracteristicas: string;
  imagen: string;
  slug: string;
  marca: string;
  especificaciones: EspecificacionesProducto;
}

export interface EspecificacionesProducto {
  pantalla: string;
  procesador: string;
  ram: string;
  almacenamiento: string;
  camara: string;
  bateria: string;
  sistemaOperativo: string;
}

export interface Noticias {
  iD_Noticia: number;
  iD_Usuario: number;
  iD_Producto: number;
  titulo: string;
  texto: string;
  resumen: string;
  imagen: string;
  fecha: string;
  categoria: string;
  etiquetas: string[];
  slug: string;
}

export interface Marcas {
  id: number;
  nombreMarca: string;
  logo: string;
  descripcion: string;
  slug: string;
}

export interface Categorias {
  id: number;
  nombre: string;
  descripcion: string;
  slug: string;
}

export interface ComparisonResult {
  category: string;
  phone1Score: number;
  phone2Score: number;
  winner: 'phone1' | 'phone2' | 'tie';
}