import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, ChevronRight } from 'lucide-react';
import { Phone } from '../types';
import { phones } from '../data/mockData';
import SpecTable from '../components/ui/SpecTable';
import { motion } from 'framer-motion';

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [relatedPhones, setRelatedPhones] = useState<Phone[]>([]);
  
  useEffect(() => {
    const foundPhone = phones.find(p => p.slug === id);
    setPhone(foundPhone || null);
    
    if (foundPhone) {
      const related = phones
        .filter(p => p.brand === foundPhone.brand && p.id !== foundPhone.id)
        .slice(0, 3);
      setRelatedPhones(related);
    }
  }, [id]);
  
  if (!phone) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Cargando reseña...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="py-6">
            <Link
              to="/reviews"
              className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver a Reseñas
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <img
                src={phone.image}
                alt={`${phone.brand} ${phone.name}`}
                className="max-h-[500px] object-contain drop-shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {phone.brand}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {phone.name}
              </h1>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Características clave
                </h3>
                <ul className="space-y-3">
                  {phone.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight size={18} className="text-primary-500 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
                  Ver precios
                </button>
                <button className="p-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Descripción general
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                El {phone.brand} {phone.name} es un smartphone insignia que muestra las últimas innovaciones y tecnología de punta de la marca. Lanzado el {new Date(phone.releaseDate).toLocaleDateString()}, este dispositivo se ha convertido rápidamente en un referente para los smartphones premium.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Impulsado por el procesador {phone.specs.procesador} y equipado con {phone.specs.ram} de RAM, el {phone.name} ofrece un rendimiento excepcional incluso para las aplicaciones y juegos más exigentes. La pantalla {phone.specs.pantalla} ofrece imágenes impresionantes con colores vivos y movimiento fluido, perfecta para consumir multimedia y jugar.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                En el apartado de cámaras, el {phone.name} cuenta con {phone.specs.camara}, permitiendo a los usuarios capturar fotos y videos de calidad profesional en diversas condiciones de iluminación. El dispositivo funciona con {phone.specs.sistemaOperativo}, ofreciendo una interfaz limpia e intuitiva con las últimas funciones y actualizaciones de seguridad.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Con una batería de {phone.specs.bateria}, el {phone.name} proporciona autonomía para todo el día para la mayoría de los usuarios, incluso con uso intensivo. El dispositivo también soporta carga rápida, carga inalámbrica y carga inalámbrica inversa, ofreciendo opciones versátiles para usuarios en movimiento.
              </p>
            </motion.div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Rendimiento y experiencia de usuario
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                El {phone.name} ofrece un excelente rendimiento en las tareas del día a día, con aplicaciones que se abren rápidamente y multitarea fluida. El rendimiento en juegos es particularmente impresionante, incluso en títulos exigentes que corren a altas tasas de cuadros y con estabilidad constante.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                La interfaz de usuario es pulida y responsiva, con funciones pensadas para mejorar la experiencia general. Las animaciones son fluidas y el sistema rara vez muestra retrasos o parpadeos, incluso bajo cargas pesadas.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                La batería es confiable, normalmente dura todo el día con uso moderado a intensivo. La carga rápida es una adición bienvenida, permitiendo cargar el dispositivo de 0 a 50% en unos 30 minutos, lo cual es conveniente para recargas rápidas durante el día.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <SpecTable specs={phone.specs} />
            
            {relatedPhones.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Teléfonos relacionados
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {relatedPhones.map((related) => (
                      <Link
                        key={related.id}
                        to={`/reviews/${related.slug}`}
                        className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-750 p-2 rounded-lg transition-colors"
                      >
                        <img
                          src={related.image}
                          alt={`${related.brand} ${related.name}`}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {related.name}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
