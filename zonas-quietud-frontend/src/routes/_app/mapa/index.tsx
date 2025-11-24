import { createFileRoute } from '@tanstack/react-router'
import { MapDashboard } from '@/features/map/components/MapDashboard'

export const Route = createFileRoute('/_app/mapa/')({
  component: MapDashboard,
})
