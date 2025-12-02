import ContactoPage from '@/pages/contactoPage'
import { createFileRoute } from '@tanstack/react-router'

type ContactoSearch = {
  reason?: string
}

export const Route = createFileRoute('/contacto')({
  component: ContactoPage,
  validateSearch: (search: Record<string, unknown>): ContactoSearch => {
    return {
      reason: (search.reason as string) || undefined,
    }
  },
})
