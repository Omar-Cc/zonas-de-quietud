export const streetData = {
  name: 'Av. Arequipa',
  district: 'Miraflores',
  overallScore: 8.5,
  totalReviews: 245,
  lastUpdated: 'Hace 2 horas',
  coordinates: '-12.1234, -77.5678',
  categories: [
    { name: 'Seguridad', value: 8.2, change: +0.3 },
    { name: 'Calidad del Aire', value: 7.8, change: -0.2 },
    { name: 'Nivel de Ruido', value: 5.5, change: +0.5 },
    { name: 'Accesibilidad', value: 9.0, change: +0.1 },
    { name: 'Tranquilidad', value: 7.2, change: -0.1 },
  ],
  externalMetrics: [
    {
      label: 'Índice de Criminalidad',
      value: 'Bajo',
      status: 'positive' as const,
      score: 8.5,
    },
    {
      label: 'Calidad del Aire (PM2.5)',
      value: '32 µg/m³',
      status: 'neutral' as const,
      score: 6.5,
    },
    {
      label: 'Nivel de Ruido Promedio',
      value: '65 dB',
      status: 'negative' as const,
      score: 5.0,
    },
    {
      label: 'Acceso a Transporte',
      value: 'Excelente',
      status: 'positive' as const,
      score: 9.0,
    },
    {
      label: 'Proximidad a Parques',
      value: '5 parques',
      status: 'positive' as const,
      score: 8.0,
    },
    {
      label: 'Iluminación Nocturna',
      value: 'Buena',
      status: 'positive' as const,
      score: 7.5,
    },
  ],
  reviews: [
    {
      id: 1,
      user: 'María González',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      rating: 9,
      date: 'Hace 3 días',
      comment:
        'Excelente calle para vivir. Muy segura y con todos los servicios cerca. El único problema es el ruido durante las horas pico.',
      photos: 2,
      likes: 12,
    },
    {
      id: 2,
      user: 'Carlos Ruiz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      rating: 8,
      date: 'Hace 5 días',
      comment:
        'Buena ubicación y accesibilidad. Las veredas están en buen estado y hay rampas para personas con discapacidad.',
      photos: 1,
      likes: 8,
    },
    {
      id: 3,
      user: 'Ana Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      rating: 7,
      date: 'Hace 1 semana',
      comment:
        'Me gusta la zona pero el tráfico es intenso. Recomendaría mejorar la sincronización de semáforos.',
      photos: 3,
      likes: 15,
    },
  ],
  trendData: [
    { month: 'Ene', score: 7.8 },
    { month: 'Feb', score: 8.0 },
    { month: 'Mar', score: 8.2 },
    { month: 'Abr', score: 8.1 },
    { month: 'May', score: 8.3 },
    { month: 'Jun', score: 8.5 },
  ],
}

export type StreetData = typeof streetData
