import { Productos, Noticias, Marcas, Categorias, ComparisonResult } from '../types';
import { useEffect, useState } from 'react';
import axiosInstance from '../axios/Axios';

// Hook para obtener teléfonos desde la API
export function usePhones() {
  const [phones, setPhones] = useState<Productos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get<Productos[]>('/Productos')
      .then(response => {
        setPhones(response.data.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener teléfonos');
        setLoading(false);
      });
  }, []);

  return { phones, loading, error };
}

export function useNews() {
  const [news, setNews] = useState<Noticias[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get<Noticias[]>('/Noticias')
      .then(response => {
        setNews(response.data.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener noticias');
        setLoading(false);
      });
  }, []);

  return { news, loading, error };
}

export function useBrands() {
  const [brands, setBrands] = useState<Marcas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get<Marcas[]>('/Marcas')
      .then(response => {
        setBrands(response.data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener marcas');
        setLoading(false);
      });
  }, []);

  return { brands, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Categorias[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get<Categorias[]>('/Categorias')
      .then(response => {
        setCategories(response.data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener categorías');
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}

// Mock Comparaciones
export const mockComparisonResults: ComparisonResult[] = [
  {
    category: 'Pantalla',
    phone1Score: 9.2,
    phone2Score: 9.4,
    winner: 'phone2'
  },
  {
    category: 'Rendimiento',
    phone1Score: 9.6,
    phone2Score: 9.3,
    winner: 'phone1'
  },
  {
    category: 'Cámara',
    phone1Score: 9.0,
    phone2Score: 9.5,
    winner: 'phone2'
  },
  {
    category: 'Batería',
    phone1Score: 8.7,
    phone2Score: 9.2,
    winner: 'phone2'
  },
  {
    category: 'Software',
    phone1Score: 9.4,
    phone2Score: 8.9,
    winner: 'phone1'
  },
  {
    category: 'Diseño',
    phone1Score: 9.5,
    phone2Score: 9.5,
    winner: 'tie'
  },
  {
    category: 'Valor',
    phone1Score: 8.5,
    phone2Score: 9.0,
    winner: 'phone2'
  }
];