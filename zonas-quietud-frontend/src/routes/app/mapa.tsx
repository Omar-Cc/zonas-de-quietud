import MapaPage from '@/pages/mapaPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/mapa')({
  component: MapaPage,
})
