// Phone related types
export interface Phone {
  id: string;
  brand: string;
  name: string;
  image: string;
  releaseDate: string;
  specs: PhoneSpecs;
  highlights: string[];
  slug: string;
}

export interface PhoneSpecs {
  pantalla: string;
  procesador: string;
  ram: string;
  almacenamiento: string;
  camara: string;
  bateria: string;
  sistemaOperativo: string;
}

// News related types
export interface NewsArticle {
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

// Brand related types
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  slug: string;
}

// Comparison related types
export interface ComparisonResult {
  category: string;
  phone1Score: number;
  phone2Score: number;
  winner: 'phone1' | 'phone2' | 'tie';
}