import React, { useState, useEffect } from 'react';
import { X, Plus, Upload, AlertCircle } from 'lucide-react';
import axiosInstance from '../../axios/Axios';
import { EspecificacionesProducto, Marcas} from '../../types';

// Interface para el formulario de producto
interface ProductoFormData {
  nombre: string;
  fecha: string;
  caracteristicas: string;
  imagen: string;
  slug: string;
  marca: string;
  especificaciones: EspecificacionesProducto;
}

// Interface para errores de validación
interface FormErrors {
  nombre?: string;
  fecha?: string;
  camara?: string;
  pantalla?: string;
  bateria?: string;
  caracteristicas?: string;
  imagen?: string;
  procesador?: string;
  almacenamiento?: string;
  sistemaOperativo?: string;
  ram?: string;
  marca?: string;
}

// Props para el componente modal
interface ProductoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductoFormData) => Promise<void>;
  loading?: boolean;
  productToEdit?: ProductoFormData | null;
}

const ProductoFormModal: React.FC<ProductoFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  productToEdit = null
}) => {
  const [formData, setFormData] = useState<ProductoFormData>({
    nombre: '',
    fecha: '',
    caracteristicas: '',
    imagen: '',
    slug: '',
    marca: '',
    especificaciones: {
      camara: '',
      pantalla: '',
      bateria: '',
      procesador: '',
      almacenamiento: '',
      sistemaOperativo: '',
      ram: ''
    }
  });

  const [marcas, setMarcas] = useState<Marcas[]>([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axiosInstance.get('/Marcas');
        setMarcas(response.data);
      } catch (error) {
        console.error('Error al obtener marcas:', error);
      }
    };
    fetchMarcas();
  }, []);

  useEffect(() => {
  if (productToEdit) {
    setFormData(productToEdit);
  } else {
    // Si no hay producto a editar, resetea el formulario
    setFormData({
      nombre: '',
      fecha: '',
      caracteristicas: '',
      imagen: '',
      slug: '',
      marca: '',
      especificaciones: {
        camara: '',
        pantalla: '',
        bateria: '',
        procesador: '',
        almacenamiento: '',
        sistemaOperativo: '',
        ram: ''
      }
    });
  }
}, [productToEdit, isOpen]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es obligatorio';
    }

    if (!formData.fecha.trim()) {
      newErrors.fecha = 'La fecha es obligatoria';
    }

    if (!formData.especificaciones.camara.trim()) {
      newErrors.camara = 'La información de la cámara es obligatoria';
    }

    if (!formData.especificaciones.pantalla.trim()) {
      newErrors.pantalla = 'La información de la pantalla es obligatoria';
    }

    if (!formData.especificaciones.bateria.trim()) {
      newErrors.bateria = 'La información de la batería es obligatoria';
    }

    if (!formData.caracteristicas.trim()) {
      newErrors.caracteristicas = 'Las características son obligatorias';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ): void => {
      const { name, value } = e.target;
      
      // Manejar campos anidados para especificaciones
      let processedValue: string | number = value;

      // Si el campo pertenece a especificaciones, actualiza el objeto anidado
      const especificacionesFields = [
        'camara',
        'pantalla',
        'bateria',
        'procesador',
        'almacenamiento',
        'sistemaOperativo',
        'ram'
      ];

      if (especificacionesFields.includes(name)) {
        setFormData(prev => ({
          ...prev,
          especificaciones: {
        ...prev.especificaciones,
        [name]: processedValue
          }
        }));
        // Limpiar error del campo si existe
        if (errors[name as keyof FormErrors]) {
          setErrors(prev => ({
        ...prev,
        [name]: undefined
          }));
        }
        return;
      }

      // Si el campo es marca (id), asegúrate de que sea string o number según tu backend
      if (name == 'marca') {
        processedValue = value;
      }
  
      setFormData(prev => ({
        ...prev,
        [name]: processedValue
      }));
  
      // Limpiar error del campo si existe
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
    };

  // Manejar envío del formulario
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // Formatear fecha si es necesaria
      const productData: ProductoFormData = {
        ...formData,
        fecha: formData.fecha || new Date().toISOString().split('T')[0]
      };

      await onSubmit(productData);
      handleClose();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      // Aquí puedes manejar errores específicos
    } finally {
      setSubmitting(false);
    }
  };

  // Cerrar modal y limpiar formulario
  const handleClose = (): void => {
    setFormData({
      nombre: '',
      fecha: '',
      caracteristicas: '',
      imagen: '',
      slug: '',
      marca: '',
      especificaciones: {
        camara: '',
        pantalla: '',
        bateria: '',
        procesador: '',
        almacenamiento: '',
        sistemaOperativo: '',
        ram: ''
      }
    });
    setErrors({});
    onClose();
  };

  // Manejar carga de imagen
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return; 

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/Image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const imageUrl = response.data.url; // Asegúrate de que la respuesta tenga esta estructura
      console.log('Imagen cargada:', imageUrl);

      // Actualizar el estado del formulario con la URL de la imagen
      setFormData(prev => ({
        ...prev,
        imagen: imageUrl
      }));
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      setErrors(prev => ({
        ...prev,
        imagen: 'Error al cargar la imagen'
      }));
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={submitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido del formulario */}
        <div className="p-6 space-y-6">
          {/* Marca del producto */}
          <div>
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">
              Marca del Producto *
            </label>
            <select
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 ${
                  errors.marca ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                disabled={submitting}
              >
                <option value={0}>Seleccionar marca</option>
                {marcas.map(marca => (
                  <option key={marca.id} value={marca.nombreMarca}>
                    {marca.nombreMarca}
                  </option>
                ))}
              </select>
            {errors.almacenamiento && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.almacenamiento}
              </p>
            )}
          </div>

          {/* Nombre del producto */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: iPhone 15 Pro Max"
              disabled={submitting}
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.nombre}
              </p>
            )}
          </div>

          {/* Fecha de lanzamiento */}
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Lanzamiento *
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.fecha ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={submitting}
            />
            {errors.fecha && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.fecha}
              </p>
            )}
          </div>

          {/* Grid para especificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cámara */}
            <div>
              <label htmlFor="camara" className="block text-sm font-medium text-gray-700 mb-2">
                Cámara *
              </label>
              <input
                type="text"
                id="camara"
                name="camara"
                value={formData.especificaciones.camara}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.camara ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 48MP + 12MP + 12MP"
                disabled={submitting}
              />
              {errors.camara && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.camara}
                </p>
              )}
            </div>

            {/* Pantalla */}
            <div>
              <label htmlFor="pantalla" className="block text-sm font-medium text-gray-700 mb-2">
                Pantalla *
              </label>
              <input
                type="text"
                id="pantalla"
                name="pantalla"
                value={formData.especificaciones.pantalla}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.pantalla ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 6.7 pulgadas Super Retina XDR"
                disabled={submitting}
              />
              {errors.pantalla && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.pantalla}
                </p>
              )}
            </div>

            {/* Procesador */}
            <div>
              <label htmlFor="procesador" className="block text-sm font-medium text-gray-700 mb-2">
                Procesador *
              </label>
              <input
                type="text"
                id="procesador"
                name="procesador"
                value={formData.especificaciones.procesador}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.procesador ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Snapdragon 8 Gen 2"
                disabled={submitting}
              />
              {errors.pantalla && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.pantalla}
                </p>
              )}
            </div>

            {/* RAM */}
            <div>
              <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-2">
                RAM *
              </label>
              <input
                type="text"
                id="ram"
                name="ram"
                value={formData.especificaciones.ram}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.procesador ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Snapdragon 8 Gen 2"
                disabled={submitting}
              />
              {errors.pantalla && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.pantalla}
                </p>
              )}
            </div>

            {/* Almacenamiento */}
            <div>
              <label htmlFor="almacenamiento" className="block text-sm font-medium text-gray-700 mb-2">
                Almacenamiento *
              </label>
              <input
                type="text"
                id="almacenamiento"
                name="almacenamiento"
                value={formData.especificaciones.almacenamiento}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.almacenamiento ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 128GB, 256GB, 512GB"
                disabled={submitting}
              />
              {errors.almacenamiento && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.almacenamiento}
                </p>
              )}
            </div>

            {/* Sistema Operativo */}
            <div>
              <label htmlFor="sistemaOperativo" className="block text-sm font-medium text-gray-700 mb-2">
                Sistema Operativo *
              </label>
              <input
                type="text"
                id="sistemaOperativo"
                name="sistemaOperativo"
                value={formData.especificaciones.sistemaOperativo}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.sistemaOperativo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Android 14, iOS 17"
                disabled={submitting}
              />
              {errors.sistemaOperativo && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.sistemaOperativo}
                </p>
              )}
            </div>
          </div>

          {/* Batería */}
          <div>
            <label htmlFor="bateria" className="block text-sm font-medium text-gray-700 mb-2">
              Batería *
            </label>
            <input
              type="text"
              id="bateria"
              name="bateria"
              value={formData.especificaciones.bateria}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.bateria ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: 4441 mAh"
              disabled={submitting}
            />
            {errors.bateria && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.bateria}
              </p>
            )}
          </div>

          {/* Características */}
          <div>
            <label htmlFor="caracteristicas" className="block text-sm font-medium text-gray-700 mb-2">
              Características Principales *
            </label>
            <textarea
              id="caracteristicas"
              name="caracteristicas"
              value={formData.caracteristicas}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.caracteristicas ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe las características principales del producto..."
              disabled={submitting}
            />
            {errors.caracteristicas && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.caracteristicas}
              </p>
            )}
          </div>

          {/* Upload de imagen */}
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Producto
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="imagen"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={submitting}
              />
              <label
                htmlFor="imagen"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Seleccionar Imagen
              </label>
              {formData.imagen && (
                <span className="text-sm text-green-600">
                  ✓ {formData.imagen}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            disabled={submitting}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Agregando...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {productToEdit ? 'Guardar Cambios' : 'Agregar Producto'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoFormModal;