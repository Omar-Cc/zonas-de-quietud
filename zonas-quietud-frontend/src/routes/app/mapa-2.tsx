
import { MapDashboard } from '@/features/map/components/MapDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/mapa-2')({
  component: MapDashboard,
})
