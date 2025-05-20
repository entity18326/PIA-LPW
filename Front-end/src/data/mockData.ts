import { Phone, NewsArticle, Brand, ComparisonResult } from '../types';

// Mock Telefonos
export const phones: Phone[] = [
  {
    id: '1',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    image: 'https://i.blogs.es/718a10/img_2085/1200_800.jpeg',
    price: 1099,
    releaseDate: '2023-09-22',
    rating: 4.7,
    specs: {
      pantalla: '6.7-pulgadas Super Retina XDR OLED, 120Hz',
      procesador: 'A17 Pro Bionic',
      ram: '8GB',
      almacenamiento: '256GB / 512GB / 1TB',
      camara: '48MP principal, 12MP ultra gran angular, 12MP teleobjetivo con zoom óptico de 5x',
      bateria: '4,441 mAh',
      sistemaOperativo: 'iOS 17'
    },
    highlights: [
      'El diseño de titanio reduce el peso en 19 gramos',
      'El botón de acción reemplaza el interruptor de silencio',
      'Chip A17 Pro líder en la industria',
      'USB-C con velocidades USB 3.0',
      'Sistema de cámara mejorado con zoom óptico de 5x'
    ],
    slug: 'apple-iphone-15-pro-max'
  },
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    image: 'https://images.samsung.com/is/image/samsung/assets/mx/smartphones/galaxy-s24-ultra/buy/01_S24Ultra-Group-KV_PC_0527_final.jpg?imbypass=true',
    price: 1299,
    releaseDate: '2024-01-31',
    rating: 4.6,
    specs: {
      pantalla: '6.8-pulgadas Dynamic AMOLED 2X, 120Hz',
      procesador: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      almacenamiento: '256GB / 512GB / 1TB',
      camara: '200MP principal, 12MP ultra gran angular, 50MP telefoto con zoom óptico de 5x, 10MP telefoto con zoom óptico de 3x',
      bateria: '5,000 mAh',
      sistemaOperativo: 'Android 14 con One UI 6.1'
    },
    highlights: [
      'Estructura de titanio con durabilidad mejorada',
      'S Pen incluido con mayor capacidad de respuesta',
      'Funciones de fotografía mejoradas por IA',
      'Siete años de actualizaciones de sistema operativo',
      'Funciones Galaxy AI como Círculo para Buscar'
    ],
    slug: 'samsung-galaxy-s24-ultra'
  },
  {
    id: '3',
    brand: 'Google',
    name: 'Pixel 8 Pro',
    image: 'https://m.media-amazon.com/images/I/71XEjCc4yLL._AC_UF894,1000_QL80_.jpg',
    price: 999,
    releaseDate: '2023-10-12',
    rating: 4.5,
    specs: {
      pantalla: '6.7-pulgadas Super Actua OLED, 120Hz',
      procesador: 'Google Tensor G3',
      ram: '12GB',
      almacenamiento: '128GB / 256GB / 512GB / 1TB',
      camara: '50MP principal, 48MP ultra gran angular, 48MP telefoto con zoom óptico de 5x',
      bateria: '5,050 mAh',
      sistemaOperativo: 'Android 14'
    },
    highlights: [
      'Funciones de IA de Google mejoradas',
      'Sensor de temperatura para medir objetos',
      'Fotografía Night Sight mejorada',
      'Siete años de actualizaciones de sistema operativo y seguridad',
      'Magic Editor para edición avanzada de fotos'
    ],
    slug: 'google-pixel-8-pro'
  },
  {
    id: '4',
    brand: 'Xiaomi',
    name: 'Xiaomi 14 Ultra',
    image: 'https://www.notebookcheck.org/uploads/tx_nbc2/Xiaomi_14_Ultra.jpg',
    price: 1299,
    releaseDate: '2024-02-25',
    rating: 4.4,
    specs: {
      pantalla: '6.73-pulgadas LTPO AMOLED, 120Hz',
      procesador: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      almacenamiento: '512GB / 1TB',
      camara: 'Sistema Leica cuádruple de 50MP con apertura variable',
      bateria: '5,000 mAh',
      sistemaOperativo: 'Android 14 con HyperOS'
    },
    highlights: [
      'Sistema de cámara cuádruple Leica co-diseñado',
      'Apertura variable de f/1.63 a f/4.0',
      'Carga por cable de 90W y carga inalámbrica de 50W',
      'Resistencia al agua y polvo IP68',
      'Sensor de luz con contraste de 3,000,000:1'
    ],
    slug: 'xiaomi-14-ultra'
  },
  {
    id: '5',
    brand: 'OnePlus',
    name: 'OnePlus 12',
    image: 'https://www.oneplus.com/content/dam/oasis/page/2024/global/product/waffle/share.jpg',
    price: 799,
    releaseDate: '2024-01-23',
    rating: 4.3,
    specs: {
      pantalla: '6.82-pulgadas LTPO AMOLED, 120Hz',
      procesador: 'Snapdragon 8 Gen 3',
      ram: '12GB / 16GB',
      almacenamiento: '256GB / 512GB',
      camara: '50MP principal, 48MP ultra gran angular, 64MP telefoto con zoom óptico de 3x',
      bateria: '5,400 mAh',
      sistemaOperativo: 'Android 14 con OxygenOS 14'
    },
    highlights: [
      'Carga SUPERVOOC de 100W líder en la industria',
      'Sistema de cámara Hasselblad para colores naturales',
      'Tecnología Rain Touch para uso con pantalla mojada',
      'Aqua Touch para uso con manos mojadas',
      '4ta generación de ajuste de cámara Hasselblad'
    ],
    slug: 'oneplus-12'
  }
];

// Mock Noticias
export const news: NewsArticle[] = [
  {
    id: '1',
    title: 'Apple lanzará el iPhone 16 con funciones revolucionarias de IA',
    excerpt: 'Se rumorea que la próxima serie iPhone 16 contará con capacidades de IA innovadoras impulsadas por un Neural Engine mejorado.',
    content: 'Apple está lista para presentar la serie iPhone 16 este año, y según fuentes de la industria, los nuevos dispositivos contarán con capacidades revolucionarias de IA. Se espera que el Neural Engine mejorado procese tareas complejas de IA localmente, ofreciendo mayor privacidad y tiempos de respuesta más rápidos en comparación con soluciones basadas en la nube.\n\nLas nuevas funciones de IA, conocidas colectivamente como "Apple Intelligence", permitirán edición avanzada de fotos, procesamiento de lenguaje natural y recomendaciones personalizadas. Estas capacidades estarán profundamente integradas en iOS 18, que también se espera reciba un rediseño significativo.\n\nLos analistas predicen que estas mejoras de IA podrían impulsar un importante ciclo de actualización para Apple, potencialmente aumentando las ventas de iPhone más allá de las expectativas previas.\n\n"El enfoque de Apple para el procesamiento de IA en el dispositivo podría establecer un nuevo estándar para la industria", dijo el analista tecnológico Ming-Chi Kuo. "Al procesar los datos localmente en lugar de enviarlos a la nube, Apple puede ofrecer mayor privacidad y mejor rendimiento."',
    image: 'https://images.pexels.com/photos/9775015/pexels-photo-9775015.jpeg',
    author: 'Mark Richards',
    date: '2024-04-18',
    category: 'Rumores',
    tags: ['Apple', 'iPhone 16', 'IA', 'iOS 18'],
    slug: 'apple-iphone-16-ai-features'
  },
  {
    id: '2',
    title: 'Samsung desarrolla tecnología revolucionaria de baterías de grafeno',
    excerpt: 'El equipo de investigación de Samsung ha logrado avances significativos en la tecnología de baterías de grafeno, prometiendo cargas más rápidas y mayor duración.',
    content: 'Investigadores de Samsung han logrado un avance en la tecnología de baterías de grafeno, según un informe reciente del Korea Herald. Esta nueva tecnología podría revolucionar el rendimiento de las baterías de los smartphones, con tiempos de carga de hasta 8 minutos para una carga completa y una vida útil sustancialmente mayor que las baterías de ion-litio actuales.\n\nEl grafeno, una sola capa de átomos de carbono dispuestos en una estructura de panal bidimensional, ha sido considerado un "material milagroso" por sus propiedades extraordinarias. Es unas 200 veces más fuerte que el acero, increíblemente ligero y un excelente conductor de calor y electricidad.\n\n"Esto podría ser el avance más importante en tecnología de baterías móviles en más de una década", dijo la experta en ciencia de materiales Dra. Kim Ji-hyun, de la Universidad Nacional de Seúl. "Si Samsung logra comercializar esta tecnología, resolvería uno de los problemas más persistentes para los usuarios de smartphones."\n\nSamsung no ha comentado oficialmente cuándo podría aparecer esta tecnología en dispositivos de consumo, pero los analistas de la industria sugieren que la implementación limitada podría comenzar en 2026, con producción en masa en los años siguientes.',
    image: 'https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg',
    author: 'Sarah Johnson',
    date: '2024-04-15',
    category: 'Tecnología',
    tags: ['Samsung', 'Tecnología de baterías', 'Grafeno', 'Investigación'],
    slug: 'samsung-graphene-battery-technology'
  },
  {
    id: '3',
    title: 'Google presenta Android 15 Beta con controles de privacidad mejorados',
    excerpt: 'La primera beta de Android 15 introduce funciones de privacidad integrales y un lenguaje de diseño actualizado.',
    content: 'Google ha lanzado la primera beta de Android 15 para desarrolladores, mostrando una gama de nuevas funciones de privacidad y mejoras de diseño. La actualización introduce un sistema de permisos renovado que brinda a los usuarios un control más detallado sobre qué datos pueden acceder las aplicaciones y cuándo pueden hacerlo.\n\nUna de las adiciones más significativas es el nuevo Panel de Privacidad, que proporciona una vista completa de qué aplicaciones han accedido a permisos sensibles a lo largo del tiempo. Los usuarios pueden revocar permisos directamente desde este panel, facilitando la gestión de la privacidad.\n\n"Con Android 15, nos enfocamos en dar a los usuarios más control y transparencia", dijo Dave Burke, VP de Ingeniería para Android. "Creemos que la privacidad es un derecho fundamental y estamos construyendo herramientas que facilitan a los usuarios entender y gestionar cómo se utiliza su información."\n\nLa beta también introduce un lenguaje de diseño renovado que amplía la personalización Material You introducida en Android 12. La nueva interfaz incluye animaciones más fluidas, widgets mejorados y más opciones de personalización.\n\nLos desarrolladores pueden descargar la Beta de Android 15 ahora, con el lanzamiento público previsto para otoño de 2024.',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    author: 'John Doe',
    date: '2024-04-12',
    category: 'Software',
    tags: ['Google', 'Android 15', 'Privacidad', 'Beta'],
    slug: 'google-android-15-beta-privacy-controls'
  },
  {
    id: '4',
    title: 'Xiaomi presenta avance en tecnología de baterías',
    excerpt: 'La nueva tecnología de baterías de ánodo de silicio-oxígeno de Xiaomi promete un 20% más de capacidad manteniendo la carga rápida.',
    content: 'Xiaomi ha presentado su última innovación en tecnología de baterías, con materiales de ánodo de silicio-oxígeno que podrían aumentar la capacidad de la batería hasta en un 20% en comparación con las baterías de ion-litio tradicionales del mismo tamaño físico.\n\nDurante un evento de presentación tecnológica en Beijing, Xiaomi demostró cómo la nueva tecnología de batería funciona junto con su solución de carga rápida propietaria, logrando una carga completa en solo 20 minutos sin sacrificar la mayor capacidad.\n\n"La tecnología de baterías ha sido un cuello de botella en la evolución de los smartphones durante años", dijo Lei Jun, fundador y CEO de Xiaomi. "Con este avance, abordamos tanto la capacidad como la velocidad de carga al mismo tiempo, lo cual tradicionalmente ha sido difícil de lograr."\n\nLa compañía afirma que los teléfonos equipados con esta tecnología podrían durar hasta 1.5 días con uso intensivo, mejorando significativamente la experiencia del usuario. Xiaomi planea implementar esta tecnología en sus dispositivos insignia a partir del próximo año.\n\nLos analistas de la industria señalan que los avances en tecnología de baterías son especialmente importantes a medida que funciones como el procesamiento de IA y las pantallas de alta frecuencia de actualización continúan aumentando la demanda de energía en los smartphones modernos.',
    image: 'https://images.pexels.com/photos/4526400/pexels-photo-4526400.jpeg',
    author: 'Lisa Wong',
    date: '2024-04-10',
    category: 'Tecnología',
    tags: ['Xiaomi', 'Batería', 'Innovación', 'Carga rápida'],
    slug: 'xiaomi-silicon-oxygen-battery-technology'
  },
  {
    id: '5',
    title: 'OnePlus confirma extensión de la alianza con Hasselblad por cinco años más',
    excerpt: 'OnePlus y Hasselblad han renovado su colaboración en cámaras con planes para hardware personalizado más allá de la calibración de software.',
    content: 'OnePlus ha anunciado una extensión de cinco años de su alianza con el legendario fabricante de cámaras Hasselblad, señalando una integración más profunda de la experiencia fotográfica en futuros dispositivos OnePlus. La colaboración renovada se expandirá más allá de la calibración de color por software para incluir desarrollo de hardware personalizado.\n\n"Nuestra alianza con Hasselblad ha sido fundamental para elevar la experiencia de cámara en OnePlus", dijo Pete Lau, fundador de OnePlus. "Este acuerdo extendido nos permite trabajar en innovaciones de cámara a largo plazo que no eran posibles en nuestra colaboración inicial."\n\nSegún OnePlus, los futuros dispositivos contarán con diseños ópticos Hasselblad personalizados y sensores especializados desarrollados específicamente para smartphones OnePlus. Las compañías también trabajan en algoritmos de fotografía computacional que aprovechan la experiencia en ciencia del color de Hasselblad.\n\nLa alianza ya ha dado mejoras significativas en el rendimiento de la cámara de OnePlus, especialmente en precisión de color y fotografía de retrato. La serie OnePlus 12, con la tercera generación de ajuste de cámara Hasselblad, ha recibido elogios por su reproducción natural de colores y mejor rango dinámico.\n\n"Estamos emocionados de profundizar nuestra relación con OnePlus", dijo Bronius Rudnickas, Gerente de Marketing en Hasselblad. "Al combinar los 80 años de experiencia en imagen de Hasselblad con la innovación tecnológica de OnePlus, buscamos redefinir lo que es posible en la fotografía móvil."',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    author: 'Michael Zhang',
    date: '2024-04-08',
    category: 'Alianzas',
    tags: ['OnePlus', 'Hasselblad', 'Cámara', 'Fotografía'],
    slug: 'oneplus-hasselblad-partnership-extension'
  }
];

// Mock Marcas
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    logo: 'https://images.pexels.com/photos/9574410/pexels-photo-9574410.jpeg',
    description: 'Apple Inc. es una empresa multinacional estadounidense que diseña, desarrolla y vende productos electrónicos de consumo, software y servicios en línea. La compañía es conocida por sus productos de hardware premium como iPhone, iPad, Mac, Apple Watch y AirPods.',
    slug: 'apple'
  },
  {
    id: '2',
    name: 'Samsung',
    logo: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
    description: 'Samsung Electronics Co., Ltd. es una empresa multinacional surcoreana y la filial principal del Grupo Samsung. Samsung es conocida por producir una amplia gama de productos electrónicos de consumo e industriales, incluidos smartphones como la serie Galaxy.',
    slug: 'samsung'
  },
  {
    id: '3',
    name: 'Google',
    logo: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    description: 'Google LLC es una empresa multinacional estadounidense que se especializa en servicios y productos relacionados con Internet. Google ingresó al mercado de smartphones con la serie Pixel, conocida por su calidad de cámara excepcional y experiencia Android pura.',
    slug: 'google'
  },
  {
    id: '4',
    name: 'Xiaomi',
    logo: 'https://images.pexels.com/photos/9574387/pexels-photo-9574387.jpeg',
    description: 'Xiaomi Corporation es una empresa china de electrónica fundada en 2010. La compañía se ha convertido rápidamente en uno de los mayores fabricantes de smartphones del mundo, conocida por ofrecer dispositivos de alto rendimiento a precios asequibles.',
    slug: 'xiaomi'
  },
  {
    id: '5',
    name: 'OnePlus',
    logo: 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg',
    description: 'OnePlus Technology Co., Ltd. es un fabricante chino de productos electrónicos de consumo fundado en 2013. La compañía ganó popularidad inicialmente por sus smartphones "flagship killer" que ofrecían especificaciones de gama alta a precios más bajos que la competencia.',
    slug: 'oneplus'
  },
  {
    id: '6',
    name: 'Nothing',
    logo: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg',
    description: 'Nothing es una empresa de tecnología de consumo con sede en Londres, fundada por Carl Pei, cofundador de OnePlus. La compañía se enfoca en crear productos con diseños transparentes distintivos y características innovadoras, incluidos smartphones y productos de audio.',
    slug: 'nothing'
  }
];

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