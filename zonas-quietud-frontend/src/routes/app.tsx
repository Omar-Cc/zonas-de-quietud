import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/app')({
  beforeLoad: () => {
    const { status, backendUser, backendToken } = useAuthStore.getState()

    if ((status === 'loading' || status === 'idle') && backendToken) {
      return
    }
    if (status !== 'authenticated') {
      throw redirect({ to: '/login' })
    }

    if (backendUser && !backendUser.isVerified) {
      throw redirect({ to: '/verify-email' })
    }
  },
  component: () => <Outlet />,
})
