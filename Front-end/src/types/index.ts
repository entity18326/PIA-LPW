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
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
}

export interface Marcas {
  id: string;
  nombre: string;
  logo: string;
  descripcion: string;
  slug: string;
}

export interface ComparisonResult {
  category: string;
  phone1Score: number;
  phone2Score: number;
  winner: 'phone1' | 'phone2' | 'tie';
}