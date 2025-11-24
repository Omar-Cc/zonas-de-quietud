import { createFileRoute } from '@tanstack/react-router'
import { RatingsDashboard } from '@/features/ratings/components/RatingsDashboard'

export const Route = createFileRoute('/app/calificaciones')({
  component: RatingsDashboard,
})
