import { PublicHelpCenter } from '@/features/support/components/PublicHelpCenter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ayuda')({
  component: PublicHelpCenter,
})

