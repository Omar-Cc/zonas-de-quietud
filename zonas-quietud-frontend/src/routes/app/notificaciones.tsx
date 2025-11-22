import NotificacionesPage from '@/pages/notificacionesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/notificaciones')({
  component: NotificacionesPage,
})
