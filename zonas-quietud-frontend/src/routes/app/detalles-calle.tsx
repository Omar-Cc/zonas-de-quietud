import { StreetDetailView } from '@/features/map/components/street-detail/StreetDetailView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/detalles-calle')({
  component: StreetDetailView,
})