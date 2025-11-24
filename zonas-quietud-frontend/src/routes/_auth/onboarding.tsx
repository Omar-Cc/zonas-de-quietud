import { createFileRoute, redirect } from '@tanstack/react-router'
import { OnboardingForm } from '@/features/auth'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/_auth/onboarding')({
  beforeLoad: () => {
    const { firebaseUser } = useAuthStore.getState()

    // Si no hay usuario de Firebase, redirigir al login
    if (!firebaseUser) {
      throw redirect({ to: '/login' })
    }

    // Si el email no está verificado (solo para email/password), redirigir a verificación
    // Nota: Google Auth ya viene con email verificado
    if (!firebaseUser.emailVerified) {
      throw redirect({ to: '/verify-email' })
    }
  },
  component: OnboardingForm,
})
