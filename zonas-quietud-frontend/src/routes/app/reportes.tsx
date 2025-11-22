import ReportesPage from '@/pages/reportesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/reportes')({
  component: ReportesPage,
})
