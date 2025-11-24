import { createFileRoute } from '@tanstack/react-router'
import { NotificationsView } from '@/features/notifications/components/NotificationsView'

export const Route = createFileRoute('/_app/notificaciones')({
  component: NotificationsView,
})
