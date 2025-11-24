import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/_auth/login')({
  beforeLoad: () => {
    const { status, backendToken } = useAuthStore.getState()

    if (
      status === 'authenticated' ||
      (backendToken && status !== 'unauthenticated')
    ) {
      throw redirect({ to: '/app/dashboard' })
    }
  },
  component: LoginForm,
})
