import { createFileRoute, redirect } from '@tanstack/react-router'
import { VerifyEmailCard } from '@/features/auth'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/_auth/verify-email')({
  beforeLoad: () => {
    const { firebaseUser, backendUser } = useAuthStore.getState()

    if (!firebaseUser) {
      throw redirect({ to: '/login' })
    }

    if (firebaseUser.emailVerified && backendUser) {
      throw redirect({ to: '/app/dashboard' })
    }
  },
  component: VerifyEmailCard,
})
