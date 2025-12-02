import RecursosPage from '@/pages/recursosPage'
import { createFileRoute } from '@tanstack/react-router'

type RecursosSearch = {
  tab?: string
}

export const Route = createFileRoute('/recursos')({
  component: RecursosPage,
  validateSearch: (search: Record<string, unknown>): RecursosSearch => {
    return {
      tab: (search.tab as string) || undefined,
    }
  },
})
