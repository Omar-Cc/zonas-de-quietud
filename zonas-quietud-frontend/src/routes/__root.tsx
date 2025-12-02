import { useEffect } from 'react'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from '@/components/ui/sonner'
import { Loader2 } from 'lucide-react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuthStore } from '@/store/authStore'
import Layout from '@/components/layouts/layout'
import { useUser } from '@/features/auth/hooks/useUser'
import { env } from '@/config/env'

function AuthListener() {
  const syncFirebaseUser = useAuthStore((state) => state.syncFirebaseUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  useUser()

  useEffect(() => {
    setLoading()

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      syncFirebaseUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [syncFirebaseUser, setLoading])

  return null
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--fondo)">
      <div className="space-y-4 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-(--principal)" />
        <p className="text-muted-foreground">Cargando sesión...</p>
      </div>
    </div>
  )
}

function RootLayout() {
  const location = useLocation()
  const status = useAuthStore((state) => state.status)

  const noLayoutRoutes = [
    '/login',
    '/register',
    '/verify-email',
    '/onboarding',
    '/confirm-email',
  ]

  const shouldShowLayout = !noLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  )

  if (status === 'loading' || status === 'idle') {
    return (
      <>
        <AuthListener />
        <LoadingScreen />
        <Toaster />
      </>
    )
  }

  return (
    <>
      <AuthListener />

      {shouldShowLayout ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Outlet />
      )}

      <Toaster />
      {env.isDevelopment && <TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
