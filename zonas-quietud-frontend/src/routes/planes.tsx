import { createFileRoute } from '@tanstack/react-router'
import { planesPage } from '../pages/planesPage'

export const Route = createFileRoute('/planes')({
  component: planesPage,
})
