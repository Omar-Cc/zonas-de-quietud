import { createFileRoute } from '@tanstack/react-router'
import Pricing from '@/pages/planesPage'

export const Route = createFileRoute('/app/planes')({
  component: Pricing,
})
