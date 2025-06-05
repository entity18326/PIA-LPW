import React, { useState, useEffect } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

interface CategoriaFormData {
    nombre: string;
    descripcion: string;
    slug: string;
}

interface FormErrors {
    nombre?: string;
    descripcion?: string;
    slug?: string;
}

interface CategoriaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CategoriaFormData) => void;
    loading?: boolean;
    categoriaToEdit?: CategoriaFormData | null;
}

const CategoriaFormModal: React.FC<CategoriaFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    categoriaToEdit = null,
}) => {
    const [formData, setFormData] = useState<CategoriaFormData>({
        nombre: '',
        descripcion: '',
        slug: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (categoriaToEdit) {
            setFormData(categoriaToEdit);
        } else {
            setFormData({ nombre: '', descripcion: '', slug: '' });
        }
    }, [categoriaToEdit, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.descripcion) newErrors.descripcion = 'La descripción es obligatoria';
        if (!formData.slug) newErrors.slug = 'El slug es obligatorio';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en los inputs
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo si existe
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (): Promise<void> => {
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            await onSubmit(formData);
            handleClose();
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
            // Aquí podrías manejar errores específicos del servidor si es necesario
        } finally {
            setSubmitting(false);
        }
    };

    // Cerrar modal y limpiar formulario
    const handleClose = (): void => {
        setFormData({
            nombre: '',
            descripcion: '',
            slug: ''
        });
        setErrors({});
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{categoriaToEdit ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Nombre de la categoría"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm mt-1">
                                <AlertCircle size={16} className="inline mr-1" />
                                {errors.nombre}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.descripcion ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Descripción de la categoría"
                            rows={3}
                        />
                        {errors.descripcion && (
                            <p className="text-red-500 text-sm mt-1">
                                <AlertCircle size={16} className="inline mr-1" />
                                {errors.descripcion}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Slug de la categoría"
                        />
                        {errors.slug && (
                            <p className="text-red-500 text-sm mt-1">
                                <AlertCircle size={16} className="inline mr-1" />
                                {errors.slug}
                            </p>
                        )}
                    </div>
                </form>
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
                                {categoriaToEdit ? 'Guardar Cambios' : 'Agregar Categoría'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoriaFormModal;