import React, { useState, useEffect } from 'react';
import { X, Plus, Upload, AlertCircle, FileText, Calendar, User } from 'lucide-react';

// Interface para el formulario de noticia
interface NoticiaFormData {
  iD_Usuario: number;
  iD_Producto?: number | null;
  titulo: string; // AGREGADO: faltaba el título
  imagen: string;
  fecha: string;
  texto: string;
  resumen: string;
}

// Interface para errores de validación
interface FormErrors {
  iD_Usuario?: string;
  fecha?: string;
  texto?: string;
  resumen?: string;
  titulo?: string;
}

// Interface para productos (para el dropdown)
interface Producto {
  iD_Producto: number;
  nombre: string;
}

// Interface para usuarios (para el dropdown)
interface Usuario {
  iD_Usuario: number;
  nombre: string;
}

// Props para el componente modal
interface NoticiaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (noticia: NoticiaFormData) => Promise<void>;
  loading?: boolean;
  noticiaToEdit?: NoticiaFormData | null;
  productos?: Producto[];
  usuarios?: Usuario[];
  currentUserId?: number; // Para usar el usuario actual por defecto
}

const NoticiaFormModal: React.FC<NoticiaFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  noticiaToEdit = null,
  productos = [],
  usuarios = [],
  currentUserId
}) => {
  const [formData, setFormData] = useState<NoticiaFormData>({
    iD_Usuario: currentUserId || 0,
    iD_Producto: null,
    imagen: '',
    fecha: '',
    texto: '',
    resumen: '',
    titulo: ''
  });

  useEffect(() => {
    if (noticiaToEdit) {
      setFormData(noticiaToEdit);
    } else {
      // Si no hay noticia a editar, resetea el formulario
      setFormData({
        iD_Usuario: currentUserId || 0,
        iD_Producto: null,
        imagen: '',
        fecha: '',
        texto: '',
        resumen: '',
        titulo: ''
      });
    }
  }, [noticiaToEdit, isOpen, currentUserId]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.iD_Usuario || formData.iD_Usuario === 0) {
      newErrors.iD_Usuario = 'Debe seleccionar un usuario';
    }

    if (!formData.fecha.trim()) {
      newErrors.fecha = 'La fecha es obligatoria';
    }

    if (!formData.texto.trim()) {
      newErrors.texto = 'El contenido de la noticia es obligatorio';
    } else if (formData.texto.length < 50) {
      newErrors.texto = 'El contenido debe tener al menos 50 caracteres';
    }

    if (!formData.resumen.trim()) {
      newErrors.resumen = 'El resumen es obligatorio';
    } else if (formData.resumen.length < 20) {
      newErrors.resumen = 'El resumen debe tener al menos 20 caracteres';
    } else if (formData.resumen.length > 200) {
      newErrors.resumen = 'El resumen no puede exceder 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    
    // Manejar conversión de tipos para campos numéricos
    let processedValue: string | number | null = value;
    
    if (name === 'iD_Usuario') {
      processedValue = value ? parseInt(value, 10) : 0;
    } else if (name === 'iD_Producto') {
      processedValue = value ? parseInt(value, 10) : null;
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
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Error al procesar noticia:', error);
      // Aquí puedes manejar errores específicos
    } finally {
      setSubmitting(false);
    }
  };

  // Cerrar modal y limpiar formulario
  const handleClose = (): void => {
    setFormData({
        iD_Usuario: currentUserId || 0,
        iD_Producto: null,
        imagen: '',
        fecha: '',
        texto: '',
        resumen: '',
        titulo: ''
    });
    setErrors({});
    onClose();
  };

  // Manejar carga de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Aquí implementarías la lógica de subida de imagen
      // Por ahora solo guardamos el nombre del archivo
      setFormData(prev => ({
        ...prev,
        imagen: file.name
      }));
    }
  };

  // Función para contar caracteres restantes
  const getRemainingChars = (text: string, max: number): string => {
    const remaining = max - text.length;
    return `${remaining} caracteres restantes`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {noticiaToEdit ? 'Editar Noticia' : 'Agregar Nueva Noticia'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            disabled={submitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido del formulario */}
        <div className="p-6 space-y-6">
          {/* Grid para información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Usuario */}
            <div>
              <label htmlFor="iD_Usuario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autor *
              </label>
              <select
                id="iD_Usuario"
                name="iD_Usuario"
                value={formData.iD_Usuario}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 ${
                  errors.iD_Usuario ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                disabled={submitting}
              >
                <option value={0}>Seleccionar autor</option>
                {usuarios.map(usuario => (
                  <option key={usuario.iD_Usuario} value={usuario.iD_Usuario}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>
              {errors.iD_Usuario && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.iD_Usuario}
                </p>
              )}
            </div>

            {/* Fecha */}
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Publicación *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 ${
                  errors.fecha ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
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
          </div>

          {/* Producto relacionado (opcional) */}
          <div>
            <label htmlFor="iD_Producto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Producto Relacionado (Opcional)
            </label>
            <select
              id="iD_Producto"
              name="iD_Producto"
              value={formData.iD_Producto || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
              disabled={submitting}
            >
              <option value="">Sin producto relacionado</option>
              {productos.map(producto => (
                <option key={producto.iD_Producto} value={producto.iD_Producto}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>

        
            {/* Título de la noticia */}
            <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título de la Noticia *
                </label>
                <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                maxLength={100}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 ${
                    errors.titulo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Escribe el título de la noticia..."
                disabled={submitting}
                />
                {errors.titulo && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.titulo}
                </p>
                )}
            </div>

            {/* Resumen */}
            <div>
                <label htmlFor="resumen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resumen de la Noticia *
                </label>
                <textarea
                    id="resumen"
                    name="resumen"
                    value={formData.resumen}
                    onChange={handleInputChange}
                    rows={3}
                    maxLength={200}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-gray-200 ${
                        errors.resumen ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Escribe un resumen breve de la noticia (máximo 200 caracteres)..."
                    disabled={submitting}
                />
                <div className="flex justify-between items-center mt-1">
                {errors.resumen ? (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.resumen}
                    </p>
                ) : (
                    <span></span>
                )}
                <span className={`text-xs ${
                    formData.resumen.length > 180 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                }`}>
                    {getRemainingChars(formData.resumen, 200)}
                </span>
                </div>
            </div>

            {/* Contenido principal */}
            <div>
                <label htmlFor="texto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contenido de la Noticia *
                </label>
                <textarea
                    id="texto"
                    name="texto"
                    value={formData.texto}
                    onChange={handleInputChange}
                    rows={8}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-gray-200 ${
                        errors.texto ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Escribe el contenido completo de la noticia..."
                    disabled={submitting}
                />
                {errors.texto && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.texto}
                </p>
                )}
                <div className="mt-1 text-right">
                <span className={`text-xs ${
                    formData.texto.length < 50 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                }`}>
                    {formData.texto.length} caracteres (mínimo 50)
                </span>
                </div>
            </div>

            {/* Upload de imagen */}
            <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Imagen de la Noticia (Opcional)
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
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    Seleccionar Imagen
                </label>
                {formData.imagen && (
                    <span className="text-sm text-green-600 dark:text-green-400">
                    ✓ {formData.imagen}
                    </span>
                )}
            </div>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            disabled={submitting}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Guardando...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                {noticiaToEdit ? 'Guardar Cambios' : 'Publicar Noticia'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticiaFormModal;