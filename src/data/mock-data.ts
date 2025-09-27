export const mockCourses = [
  {
    id: '1',
    title: 'Hijab Styling Fundamentals',
    description: 'Pelajari dasar-dasar styling hijab untuk berbagai kesempatan dengan teknik modern dan klasik.',
    thumbnail: 'https://images.unsplash.com/photo-1625987306773-8b9e554b25e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWphYiUyMHR1dG9yaWFsJTIwc3R5bGluZ3xlbnwxfHx8fDE3NTg5NjA0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    level: 'Beginner' as const,
    duration: '4h 30m',
    lessons: 12,
    price: 0,
    category: 'Hijab Styling',
    lessons_content: [
      { title: 'Pengenalan Jenis-jenis Hijab', duration: '15m', isLocked: false },
      { title: 'Basic Hijab Square Tutorial', duration: '25m', isLocked: false },
      { title: 'Hijab untuk Wajah Bulat', duration: '30m', isLocked: false },
      { title: 'Hijab untuk Acara Formal', duration: '20m', isLocked: true },
      { title: 'Cara Memilih Warna Hijab', duration: '18m', isLocked: true },
    ]
  },
  {
    id: '2',
    title: 'Modest Fashion Styling',
    description: 'Kuasai seni berpakaian modest yang elegan dan sesuai syariat Islam untuk muslimah modern.',
    thumbnail: 'https://images.unsplash.com/photo-1620196182713-89fee508ef8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlc3QlMjBmYXNoaW9uJTIwbXVzbGltYWh8ZW58MXx8fHwxNzU4OTYwNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    level: 'Advanced' as const,
    duration: '6h 15m',
    lessons: 18,
    price: 299000,
    category: 'Modest Fashion',
    lessons_content: [
      { title: 'Prinsip Berpakaian dalam Islam', duration: '35m', isLocked: true },
      { title: 'Mix and Match Outfit Muslimah', duration: '40m', isLocked: true },
      { title: 'Memilih Outfit untuk Body Shape', duration: '30m', isLocked: true },
    ]
  },
  {
    id: '3',
    title: 'Abaya dan Kaftan Styling',
    description: 'Pelajari cara memilih dan memadupadankan abaya dan kaftan untuk penampilan yang anggun dan syari.',
    thumbnail: 'https://images.unsplash.com/photo-1758551465157-7d4ae9985169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwZmFzaGlvbiUyMGFiYXlhfGVufDF8fHx8MTc1ODk2MDQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    level: 'Intermediate' as const,
    duration: '5h 45m',
    lessons: 15,
    price: 199000,
    category: 'Abaya & Kaftan',
    lessons_content: [
      { title: 'Sejarah dan Filosofi Abaya', duration: '25m', isLocked: true },
      { title: 'Memilih Abaya sesuai Postur', duration: '30m', isLocked: true },
      { title: 'Aksesoris untuk Abaya', duration: '28m', isLocked: true },
    ]
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Modest Fashion Conference 2024',
    description: 'Bergabung dengan konferensi fashion Muslimah terbesar dengan para desainer terkemuka.',
    poster: 'https://images.unsplash.com/photo-1726665937344-6856211760ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBmYXNoaW9uJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1ODk2MDUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '25 March 2024',
    time: '09:00 - 17:00',
    speaker: 'Ria Miranda, Zaskia Sungkar',
    location: 'Jakarta Convention Center',
    quota: 500,
    registered: 350,
    status: 'available' as const,
    price: 150000
  },
  {
    id: '2',
    title: 'Workshop Hijab Styling',
    description: 'Workshop praktis untuk menguasai berbagai teknik styling hijab modern dan klasik.',
    poster: 'https://images.unsplash.com/photo-1686397140330-40f4c9919b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29ya3Nob3AlMjBzZW1pbmFyfGVufDF8fHx8MTc1ODk2MDUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '10 April 2024',
    time: '10:00 - 16:00',
    speaker: 'Nisa Sabrina',
    location: 'Bandung Fashion Center',
    quota: 50,
    registered: 50,
    status: 'closed' as const,
    price: 99000
  },
  {
    id: '3',
    title: 'Seminar Bisnis Fashion Syariah',
    description: 'Pelajari cara membangun bisnis fashion yang sesuai dengan prinsip-prinsip syariah.',
    poster: 'https://images.unsplash.com/photo-1726665937344-6856211760ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBmYXNoaW9uJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1ODk2MDUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '15 May 2024',
    time: '13:00 - 18:00',
    speaker: 'Jenahara Nasution',
    location: 'Surabaya Creative Hub',
    quota: 100,
    registered: 25,
    status: 'coming-soon' as const,
    price: 199000
  },
  {
    id: '4',
    title: 'Masterclass Desain Abaya',
    description: 'Kelas master untuk desain abaya kontemporer yang menggabungkan tradisi dan modernitas.',
    poster: 'https://images.unsplash.com/photo-1686397140330-40f4c9919b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29ya3Nob3AlMjBzZW1pbmFyfGVufDF8fHx8MTc1ODk2MDUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '20 June 2024',
    time: '08:00 - 17:00',
    speaker: 'Dian Pelangi, Vivi Zubedi',
    location: 'Medan Fashion Center',
    quota: 80,
    registered: 45,
    status: 'available' as const,
    price: 250000
  },
  {
    id: '5',
    title: 'Festival Fashion Muslimah Nusantara',
    description: 'Festival budaya fashion muslimah yang menampilkan keberagaman busana daerah Indonesia.',
    poster: 'https://images.unsplash.com/photo-1726665937344-6856211760ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBmYXNoaW9uJTIwZXZlbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1ODk2MDUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '30 July 2024',
    time: '09:30 - 16:30',
    speaker: 'Anne Avantie, Ria Miranda',
    location: 'Yogyakarta Cultural Center',
    quota: 200,
    registered: 120,
    status: 'available' as const,
    price: 350000
  }
];

export const mockTickets = [
  {
    id: '1',
    eventTitle: 'Modest Fashion Conference 2024',
    date: '25 March 2024',
    time: '09:00 - 17:00',
    location: 'Jakarta Convention Center',
    ticketCode: 'MFC24-ABC123',
    status: 'active' as const
  },
  {
    id: '2',
    eventTitle: 'Workshop Hijab Styling',
    date: '10 April 2024',
    time: '10:00 - 16:00',
    location: 'Bandung Fashion Center',
    ticketCode: 'WHS24-XYZ789',
    status: 'used' as const
  }
];

export const mockPaymentChannels = [
  {
    id: '1',
    name: 'Bank BCA',
    logo: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Luma Official',
    isVerified: true
  },
  {
    id: '2',
    name: 'Bank BSI',
    logo: 'BSI',
    accountNumber: '0987654321',
    accountName: 'Luma Official',
    isVerified: true
  },
  {
    id: '3',
    name: 'GoPay',
    logo: 'GP',
    accountNumber: '081234567890',
    accountName: 'Luma Official',
    isVerified: true
  }
];

export const mockUser = {
  id: '1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  birthday: '1990-01-01',
  enrolledCourses: ['1'], // Course IDs user has enrolled in
  purchasedEvents: ['1'] // Event IDs user has purchased tickets for
};

export const categories = [
  'All', 'Hijab Styling', 'Modest Fashion', 'Abaya & Kaftan', 'Fashion Business', 'Aksesoris'
];

export const mockQuizQuestions = [
  {
    id: '1',
    question: 'Apa yang dimaksud dengan hijab dalam Islam?',
    options: [
      'Penutup kepala untuk wanita muslimah',
      'Pakaian yang menutupi aurat',
      'Jilbab khusus untuk shalat',
      'Aksesoris fashion wanita'
    ],
    correctAnswer: 1
  },
  {
    id: '2',
    question: 'Bahan manakah yang paling cocok untuk hijab sehari-hari?',
    options: [
      'Sutra murni',
      'Katun atau viscose',
      'Poliester tebal',
      'Linen kasar'
    ],
    correctAnswer: 1
  },
  {
    id: '3',
    question: 'Bagaimana cara memilih warna hijab yang tepat?',
    options: [
      'Sesuaikan dengan warna kulit dan outfit',
      'Selalu pilih warna gelap',
      'Ikuti tren yang sedang populer',
      'Pilih warna favorit saja'
    ],
    correctAnswer: 0
  }
];

export const mockLeaderboard = [
  { rank: 1, name: 'Siti Aminah', score: 95 },
  { rank: 2, name: 'Fatimah Zahra', score: 87 },
  { rank: 3, name: 'Aisha Rahman', score: 82 },
  { rank: 4, name: 'Khadijah Noor', score: 78 },
  { rank: 5, name: 'Maryam Sari', score: 75 }
];