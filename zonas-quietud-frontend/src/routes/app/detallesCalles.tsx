import StreetDetail from '@/pages/detalleCallesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/detallesCalles')({
  component: StreetDetail,
})