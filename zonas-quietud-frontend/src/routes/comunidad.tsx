import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { CommunityHub } from '@/features/community/components/CommunityHub'

// Validación de Search Params para la pestaña activa
const communitySearchSchema = z.object({
  tab: z.string().optional(),
})

export const Route = createFileRoute('/comunidad')({
  validateSearch: communitySearchSchema,
  component: CommunityHub,
})
