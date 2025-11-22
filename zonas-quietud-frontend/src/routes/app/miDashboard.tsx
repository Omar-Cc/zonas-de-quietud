import UserDashboard from '@/pages/miDashboardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/miDashboard')({
  component: UserDashboard,
})
