import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Save, X, Package } from 'lucide-react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  descripcion: string;
  fechaCreacion: string;
}

interface ProductoForm {
  nombre: string;
  precio: number | string;
  categoria: string;
  stock: number | string;
  descripcion: string;
}

const ProductosCRUD: React.FC = () => {
  // Estados principales
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Estados del formulario
  const [formData, setFormData] = useState<ProductoForm>({
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    descripcion: ''
  });

  // Datos de ejemplo inicial
  useEffect(() => {
    const productosEjemplo: Producto[] = [
      {
        id: 1,
        nombre: 'Laptop Dell XPS 13',
        precio: 1299.99,
        categoria: 'Electrónicos',
        stock: 15,
        descripcion: 'Laptop ultraportátil con procesador Intel i7',
        fechaCreacion: '2024-01-15'
      },
      {
        id: 2,
        nombre: 'Smartphone iPhone 15',
        precio: 999.99,
        categoria: 'Electrónicos',
        stock: 8,
        descripcion: 'Último modelo de iPhone con cámara mejorada',
        fechaCreacion: '2024-02-01'
      },
      {
        id: 3,
        nombre: 'Mesa de Oficina',
        precio: 299.99,
        categoria: 'Muebles',
        stock: 25,
        descripcion: 'Mesa ergonómica para oficina en casa',
        fechaCreacion: '2024-01-20'
      }
    ];
    
    setProductos(productosEjemplo);
    setFilteredProductos(productosEjemplo);
  }, []);

  // Filtrar productos
  useEffect(() => {
    let filtered = productos;

    if (searchTerm) {
      filtered = filtered.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(producto => producto.categoria === selectedCategory);
    }

    setFilteredProductos(filtered);
  }, [productos, searchTerm, selectedCategory]);

  // Obtener categorías únicas
  const categorias = Array.from(new Set(productos.map(p => p.categoria)));

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      precio: '',
      categoria: '',
      stock: '',
      descripcion: ''
    });
    setEditingId(null);
  };

  // Abrir modal para crear
  const abrirModalCrear = () => {
    limpiarFormulario();
    setShowModal(true);
  };

  // Abrir modal para editar
  const abrirModalEditar = (producto: Producto) => {
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      stock: producto.stock,
      descripcion: producto.descripcion
    });
    setEditingId(producto.id);
    setShowModal(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setShowModal(false);
    limpiarFormulario();
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? value : value
    }));
  };

  // Guardar producto (crear o actualizar)
  const guardarProducto = () => {
    // Validaciones
    if (!formData.nombre.trim() || !formData.precio || !formData.categoria || !formData.stock) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const precio = Number(formData.precio);
    const stock = Number(formData.stock);

    if (precio <= 0 || stock < 0) {
      alert('El precio debe ser mayor a 0 y el stock no puede ser negativo');
      return;
    }

    const productoData: Omit<Producto, 'id' | 'fechaCreacion'> = {
      nombre: formData.nombre.trim(),
      precio,
      categoria: formData.categoria,
      stock,
      descripcion: formData.descripcion.trim()
    };

    if (editingId) {
      // Actualizar producto existente
      setProductos(prev =>
        prev.map(producto =>
          producto.id === editingId
            ? { ...producto, ...productoData }
            : producto
        )
      );
    } else {
      // Crear nuevo producto
      const nuevoProducto: Producto = {
        ...productoData,
        id: Date.now(),
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      setProductos(prev => [...prev, nuevoProducto]);
    }

    cerrarModal();
  };

  // Eliminar producto
  const eliminarProducto = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProductos(prev => prev.filter(producto => producto.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
                <p className="text-gray-600">Administra tu inventario de productos</p>
              </div>
            </div>
            <button
              onClick={abrirModalCrear}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
            <div className="text-sm text-gray-600 flex items-center">
              Total: {filteredProductos.length} producto(s)
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProductos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{producto.descripcion}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {producto.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${producto.precio.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        producto.stock > 10 ? 'bg-green-100 text-green-800' :
                        producto.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {producto.stock} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(producto.fechaCreacion).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => abrirModalEditar(producto)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => eliminarProducto(producto.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProductos.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || selectedCategory ? 'No se encontraron productos con los filtros aplicados.' : 'Comienza creando un nuevo producto.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button
                  onClick={cerrarModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Laptop Dell XPS 13"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio *
                      </label>
                      <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Electrónicos">Electrónicos</option>
                      <option value="Muebles">Muebles</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Hogar">Hogar</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Libros">Libros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Descripción del producto..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={cerrarModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={guardarProducto}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingId ? 'Actualizar' : 'Crear'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosCRUD;