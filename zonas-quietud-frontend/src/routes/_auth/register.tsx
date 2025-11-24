import { createFileRoute, redirect } from '@tanstack/react-router'
import { RegisterForm } from '@/features/auth'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/_auth/register')({
  beforeLoad: () => {
    const { status, backendToken } = useAuthStore.getState()

    if (
      status === 'authenticated' ||
      (backendToken && status !== 'unauthenticated')
    ) {
      throw redirect({ to: '/app/dashboard' })
    }
  },
  component: RegisterForm,
})
