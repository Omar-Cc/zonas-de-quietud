import ComunidadPage from '@/pages/comunidadPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/comunidad')({
  component: ComunidadPage,
})
