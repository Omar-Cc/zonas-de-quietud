import type { Review } from '../types/types'

export const mockReviews: Review[] = [
  {
    id: 'r1',
    author: 'María García',
    text: 'Respuesta rápida y solución satisfactoria. Muy agradecida con el equipo.',
    rating: 5,
    date: '12 Nov, 2025',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop',
  },
  {
    id: 'r2',
    author: 'Carlos Ruiz',
    text: 'Atención correcta, aunque tardaron un poco en responder.',
    rating: 4,
    date: '02 Nov, 2025',
  },
  {
    id: 'r3',
    author: 'Ana López',
    text: 'No se resolvió el problema, pero el seguimiento fue bueno.',
    rating: 3,
    date: '28 Oct, 2025',
  },
]
