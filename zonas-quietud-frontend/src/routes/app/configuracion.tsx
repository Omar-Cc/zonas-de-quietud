import ConfiguracionPage from '@/pages/configuracionPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/configuracion')({
  component: ConfiguracionPage,
})
