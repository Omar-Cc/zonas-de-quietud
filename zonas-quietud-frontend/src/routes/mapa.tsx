import MapaPage from '@/pages/mapaPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mapa')({
  component: MapaPage,
})
