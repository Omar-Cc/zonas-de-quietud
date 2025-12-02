import { createFileRoute } from '@tanstack/react-router'
import Pricing from '@/pages/planesPage'

export const Route = createFileRoute('/planes')({
  component: Pricing,
})
