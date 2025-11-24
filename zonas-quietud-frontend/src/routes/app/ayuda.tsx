import { createFileRoute } from '@tanstack/react-router'
import { SupportDashboard } from '@/features/support/components/SupportDashboard'

export const Route = createFileRoute('/app/ayuda')({
  component: SupportDashboard,
})
