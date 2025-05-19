import { Phone, NewsArticle, Brand, ComparisonResult } from '../types';

// Mock Phones Data
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
      display: '6.7-inch Super Retina XDR OLED, 120Hz',
      processor: 'A17 Pro Bionic',
      ram: '8GB',
      storage: '256GB / 512GB / 1TB',
      camera: '48MP main, 12MP ultrawide, 12MP telephoto with 5x optical zoom',
      battery: '4,441 mAh',
      os: 'iOS 17'
    },
    highlights: [
      'Titanium design reduces weight by 19g',
      'Action button replaces mute switch',
      'Industry-leading A17 Pro chip',
      'USB-C with USB 3.0 speeds',
      'Improved camera system with 5x optical zoom'
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
      display: '6.8-inch Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB / 512GB / 1TB',
      camera: '200MP main, 12MP ultrawide, 50MP telephoto with 5x optical zoom, 10MP telephoto with 3x optical zoom',
      battery: '5,000 mAh',
      os: 'Android 14 with One UI 6.1'
    },
    highlights: [
      'Titanium frame with improved durability',
      'S Pen included with enhanced responsiveness',
      'AI-enhanced photography features',
      'Seven years of OS updates',
      'Galaxy AI features like Circle to Search'
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
      display: '6.7-inch Super Actua OLED, 120Hz',
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB / 256GB / 512GB / 1TB',
      camera: '50MP main, 48MP ultrawide, 48MP telephoto with 5x optical zoom',
      battery: '5,050 mAh',
      os: 'Android 14'
    },
    highlights: [
      'Enhanced Google AI features',
      'Temperature sensor for measuring objects',
      'Improved Night Sight photography',
      'Seven years of OS and security updates',
      'Magic Editor for advanced photo editing'
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
      display: '6.73-inch LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB / 1TB',
      camera: 'Quad 50MP Leica system with variable aperture',
      battery: '5,000 mAh',
      os: 'Android 14 with HyperOS'
    },
    highlights: [
      'Leica co-engineered quad camera system',
      'Variable aperture from f/1.63 to f/4.0',
      '90W wired and 50W wireless charging',
      'IP68 water and dust resistance',
      'Light sensor with 3,000,000:1 contrast'
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
      display: '6.82-inch LTPO AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB',
      camera: '50MP main, 48MP ultrawide, 64MP telephoto with 3x optical zoom',
      battery: '5,400 mAh',
      os: 'Android 14 with OxygenOS 14'
    },
    highlights: [
      'Industry-leading 100W SUPERVOOC charging',
      'Hasselblad camera system for natural colors',
      'Rain Touch technology for wet screen usage',
      'Aqua Touch for use with wet hands',
      '4th generation Hasselblad camera tuning'
    ],
    slug: 'oneplus-12'
  }
];

// Mock News Articles
export const news: NewsArticle[] = [
  {
    id: '1',
    title: 'Apple to Launch iPhone 16 with Revolutionary AI Features',
    excerpt: 'The upcoming iPhone 16 series is rumored to feature groundbreaking AI capabilities powered by an enhanced Neural Engine.',
    content: 'Apple is set to unveil the iPhone 16 series later this year, and according to industry insiders, the new devices will feature revolutionary AI capabilities. The enhanced Neural Engine is expected to process complex AI tasks locally, offering improved privacy and faster response times compared to cloud-based solutions.\n\nThe new AI features, collectively known as "Apple Intelligence," will enable advanced photo editing, natural language processing, and personalized recommendations. These capabilities will be deeply integrated into iOS 18, which is also expected to receive a significant redesign.\n\nAnalysts predict that these AI enhancements could drive a major upgrade cycle for Apple, potentially boosting iPhone sales beyond previous expectations.\n\n"Apple\'s approach to on-device AI processing could set a new standard for the industry," said tech analyst Ming-Chi Kuo. "By processing data locally instead of sending it to the cloud, Apple can offer both enhanced privacy and faster performance."',
    image: 'https://images.pexels.com/photos/9775015/pexels-photo-9775015.jpeg',
    author: 'Mark Richards',
    date: '2024-04-18',
    category: 'Rumors',
    tags: ['Apple', 'iPhone 16', 'AI', 'iOS 18'],
    slug: 'apple-iphone-16-ai-features'
  },
  {
    id: '2',
    title: 'Samsung Developing Revolutionary Graphene Battery Technology',
    excerpt: 'Samsung\'s research team has made significant progress on graphene battery technology, promising faster charging and longer lifespans.',
    content: 'Samsung researchers have reportedly achieved a breakthrough in graphene battery technology, according to a recent report from the Korea Herald. The new battery technology could potentially revolutionize smartphone battery performance with charging times as low as 8 minutes for a full charge and a lifespan that\'s substantially longer than current lithium-ion batteries.\n\nGraphene, a single layer of carbon atoms arranged in a two-dimensional honeycomb lattice, has been heralded as a "wonder material" for its extraordinary properties. It\'s about 200 times stronger than steel, incredibly lightweight, and an excellent conductor of heat and electricity.\n\n"This could be the most significant advancement in mobile battery technology in over a decade," said Dr. Kim Ji-hyun, a materials science expert at Seoul National University. "If Samsung can successfully commercialize this technology, it would address one of the most persistent pain points for smartphone users."\n\nSamsung has not officially commented on when the technology might appear in consumer devices, but industry analysts suggest that limited implementation could begin as early as 2026, with mass production following in subsequent years.',
    image: 'https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg',
    author: 'Sarah Johnson',
    date: '2024-04-15',
    category: 'Technology',
    tags: ['Samsung', 'Battery Technology', 'Graphene', 'Research'],
    slug: 'samsung-graphene-battery-technology'
  },
  {
    id: '3',
    title: 'Google Unveils Android 15 Beta with Enhanced Privacy Controls',
    excerpt: 'The first beta of Android 15 introduces comprehensive privacy features and an updated design language.',
    content: 'Google has released the first beta of Android 15 to developers, showcasing a range of new privacy features and design enhancements. The update introduces a revamped permission system that gives users more granular control over what data apps can access and when they can access it.\n\nOne of the most significant additions is the new Privacy Dashboard, which provides a comprehensive view of which apps have accessed sensitive permissions over time. Users can easily revoke permissions directly from this dashboard, making privacy management more accessible than ever.\n\n"With Android 15, we\'re focusing on giving users more control and transparency," said Dave Burke, VP of Engineering for Android. "We believe privacy is a fundamental right, and we\'re building tools that make it easier for users to understand and manage how their data is being used."\n\nThe beta also introduces a refreshed design language that builds upon the Material You customization introduced in Android 12. The new interface includes more fluid animations, improved widgets, and enhanced customization options.\n\nDevelopers can download the Android 15 Beta now, with the public release expected in fall 2024.',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    author: 'John Doe',
    date: '2024-04-12',
    category: 'Software',
    tags: ['Google', 'Android 15', 'Privacy', 'Beta'],
    slug: 'google-android-15-beta-privacy-controls'
  },
  {
    id: '4',
    title: 'Xiaomi Showcases Breakthrough in Battery Technology',
    excerpt: 'Xiaomi\'s new silicon-oxygen anode battery tech promises 20% higher capacity while maintaining fast charging capabilities.',
    content: 'Xiaomi has unveiled its latest innovation in battery technology, featuring silicon-oxygen anode materials that could increase battery capacity by up to 20% compared to traditional lithium-ion batteries with the same physical size.\n\nDuring a technology showcase event in Beijing, Xiaomi demonstrated how the new battery tech works alongside their proprietary fast-charging solution, delivering a full charge in just 20 minutes without sacrificing the increased capacity.\n\n"Battery technology has been a bottleneck in smartphone evolution for years," said Lei Jun, Xiaomi\'s founder and CEO. "With this breakthrough, we\'re addressing both capacity and charging speed simultaneously, which has traditionally been a difficult balance to achieve."\n\nThe company claims that phones equipped with the new battery technology could last up to 1.5 days with heavy usage, significantly improving the user experience. Xiaomi plans to implement this technology in its flagship devices starting next year.\n\nIndustry analysts note that advancements in battery technology are particularly important as features like AI processing and high-refresh-rate displays continue to increase power demands in modern smartphones.',
    image: 'https://images.pexels.com/photos/4526400/pexels-photo-4526400.jpeg',
    author: 'Lisa Wong',
    date: '2024-04-10',
    category: 'Technology',
    tags: ['Xiaomi', 'Battery', 'Innovation', 'Fast Charging'],
    slug: 'xiaomi-silicon-oxygen-battery-technology'
  },
  {
    id: '5',
    title: 'OnePlus Confirms Partnership with Hasselblad Extended for Five More Years',
    excerpt: 'OnePlus and Hasselblad have renewed their camera collaboration with plans for custom hardware beyond just software tuning.',
    content: 'OnePlus has announced a five-year extension of its partnership with legendary camera manufacturer Hasselblad, signaling a deeper integration of photography expertise into future OnePlus devices. The renewed collaboration will expand beyond the current software color calibration to include custom hardware development.\n\n"Our partnership with Hasselblad has been instrumental in elevating the OnePlus camera experience," said Pete Lau, founder of OnePlus. "This extended agreement allows us to work on long-term camera innovations that weren\'t possible in our initial collaboration."\n\nAccording to OnePlus, future devices will feature custom Hasselblad optical designs and specialized sensors developed specifically for OnePlus smartphones. The companies are also working on computational photography algorithms that leverage Hasselblad\'s color science expertise.\n\nThe partnership has already yielded significant improvements in OnePlus camera performance, particularly in areas like color accuracy and portrait photography. The OnePlus 12 series, featuring third-generation Hasselblad camera tuning, has received praise for its natural color reproduction and improved dynamic range.\n\n"We\'re excited to deepen our relationship with OnePlus," said Bronius Rudnickas, Marketing Manager at Hasselblad. "By combining Hasselblad\'s 80 years of imaging expertise with OnePlus\'s technological innovation, we aim to redefine what\'s possible in smartphone photography."',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    author: 'Michael Zhang',
    date: '2024-04-08',
    category: 'Partnerships',
    tags: ['OnePlus', 'Hasselblad', 'Camera', 'Photography'],
    slug: 'oneplus-hasselblad-partnership-extension'
  }
];

// Mock Brands Data
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    logo: 'https://images.pexels.com/photos/9574410/pexels-photo-9574410.jpeg',
    description: 'Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. The company is known for its premium hardware products including iPhone, iPad, Mac, Apple Watch, and AirPods.',
    slug: 'apple'
  },
  {
    id: '2',
    name: 'Samsung',
    logo: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
    description: 'Samsung Electronics Co., Ltd. is a South Korean multinational electronics company and the flagship subsidiary of the Samsung Group. Samsung is known for producing a wide range of consumer and industry electronics, including smartphones like the Galaxy series.',
    slug: 'samsung'
  },
  {
    id: '3',
    name: 'Google',
    logo: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products. Google entered the smartphone market with the Pixel series, known for exceptional camera quality and pure Android experience.',
    slug: 'google'
  },
  {
    id: '4',
    name: 'Xiaomi',
    logo: 'https://images.pexels.com/photos/9574387/pexels-photo-9574387.jpeg',
    description: 'Xiaomi Corporation is a Chinese electronics company founded in 2010. The company has quickly become one of the world\'s largest smartphone manufacturers, known for offering high-performance devices at affordable price points.',
    slug: 'xiaomi'
  },
  {
    id: '5',
    name: 'OnePlus',
    logo: 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg',
    description: 'OnePlus Technology Co., Ltd. is a Chinese consumer electronics manufacturer founded in 2013. The company initially gained popularity through its "flagship killer" smartphones that offered high-end specifications at lower prices than competitors.',
    slug: 'oneplus'
  },
  {
    id: '6',
    name: 'Nothing',
    logo: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg',
    description: 'Nothing is a consumer technology company based in London, founded by Carl Pei, co-founder of OnePlus. The company focuses on creating products with distinctive transparent designs and innovative features, including smartphones and audio products.',
    slug: 'nothing'
  }
];

// Mock Comparison Results
export const mockComparisonResults: ComparisonResult[] = [
  {
    category: 'Display',
    phone1Score: 9.2,
    phone2Score: 9.4,
    winner: 'phone2'
  },
  {
    category: 'Performance',
    phone1Score: 9.6,
    phone2Score: 9.3,
    winner: 'phone1'
  },
  {
    category: 'Camera',
    phone1Score: 9.0,
    phone2Score: 9.5,
    winner: 'phone2'
  },
  {
    category: 'Battery Life',
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
    category: 'Design',
    phone1Score: 9.5,
    phone2Score: 9.5,
    winner: 'tie'
  },
  {
    category: 'Value',
    phone1Score: 8.5,
    phone2Score: 9.0,
    winner: 'phone2'
  }
];