import { type Notification } from '../types'

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nueva incidencia reportada',
    message: 'María ha reportado ruido excesivo en Calle Olmo.',
    time: 'Hace 2h',
    unread: true,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Actualización de estado',
    message: "Tu reporte fue marcado como 'En revisión'.",
    time: 'Ayer',
    unread: false,
  },
  {
    id: '3',
    title: 'Evento comunitario',
    message: 'Reunión vecinal el próximo martes en la plaza.',
    time: 'Hace 3d',
    unread: false,
  },
]
