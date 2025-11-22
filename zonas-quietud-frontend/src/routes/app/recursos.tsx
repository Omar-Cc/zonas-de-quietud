import RecursosPage from '@/pages/recursosPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/recursos')({
  component: RecursosPage,
})
