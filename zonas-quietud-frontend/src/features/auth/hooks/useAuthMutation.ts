import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useFirebaseAuth } from './useFirebaseAuth'
import * as authApi from '../api/authApi'
import type { RegisterBackendRequest } from '../types'
import { useAuthStore } from '@/store/authStore'

/**
 * Hook para mutaciones de autenticación con React Query
 */
export const useAuthMutation = () => {
  const navigate = useNavigate()
  const firebaseAuth = useFirebaseAuth()

  const setBackendCredentials = useAuthStore(
    (state) => state.setBackendCredentials
  )

  /**
   * Mutation para login con email/password
   */
  const loginWithEmailMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      // 1. Autenticar con Firebase
      const firebaseUser = await firebaseAuth.loginWithEmail(email, password)

      // 2. Verificar email
      if (!firebaseUser.emailVerified) {
        return { action: 'VERIFY_EMAIL' as const }
      }

      // 3. Obtener token y autenticar con backend
      const token = await firebaseUser.getIdToken()
      const result = await authApi.loginWithBackend(token)

      return result
    },
    onSuccess: (result) => {
      switch (result.action) {
        case 'SUCCESS':
          setBackendCredentials(result.user, result.token)
          toast.success('¡Bienvenido de vuelta!')
          navigate({ to: '/app/dashboard' })
          break
        case 'VERIFY_EMAIL':
          toast.info('Por favor verifica tu email antes de continuar')
          navigate({ to: '/verify-email' })
          break
        case 'NEED_ONBOARDING':
          toast.info('Completa tu perfil para continuar')
          navigate({ to: '/onboarding' })
          break
        default:
          toast.success('¡Bienvenido de vuelta!')
          navigate({ to: '/app/dashboard' })
          break
      }
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      const message =
        error.code === 'auth/invalid-credential'
          ? 'Credenciales inválidas'
          : error.message || 'Error al iniciar sesión'
      toast.error(message)
    },
  })

  /**
   * Mutation para login con Google
   */
  const loginWithGoogleMutation = useMutation({
    mutationFn: async () => {
      // 1. Autenticar con Google
      const firebaseUser = await firebaseAuth.loginWithGoogle()

      // 2. Obtener token y autenticar con backend
      const token = await firebaseUser.getIdToken()
      const result = await authApi.loginWithBackend(token)

      return result
    },
    onSuccess: (result) => {
      switch (result.action) {
        case 'SUCCESS':
          setBackendCredentials(result.user, result.token)
          toast.success('¡Bienvenido de vuelta!')
          navigate({ to: '/app/dashboard' })
          break
        case 'NEED_ONBOARDING':
          toast.info('Completa tu perfil para continuar')
          navigate({ to: '/onboarding' })
          break
        default:
          toast.success('¡Bienvenido de vuelta!')
          navigate({ to: '/app/dashboard' })
          break
      }
    },
    onError: (error: any) => {
      console.error('Google login error:', error)
      toast.error(error.message || 'Error al iniciar sesión con Google')
    },
  })

  /**
   * Mutation para registro con email/password
   */
  const registerWithEmailMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      // Crear usuario en Firebase y enviar email de verificación
      await firebaseAuth.registerWithEmail(email, password)
    },
    onSuccess: () => {
      toast.success('Cuenta creada. Verifica tu email para continuar')
      navigate({ to: '/verify-email' })
    },
    onError: (error: any) => {
      console.error('Register error:', error)
      const message =
        error.code === 'auth/email-already-in-use'
          ? 'Este email ya está registrado'
          : error.message || 'Error al crear la cuenta'
      toast.error(message)
    },
  })

  /**
   * Mutation para completar onboarding
   */
  const completeOnboardingMutation = useMutation({
    mutationFn: async (data: Omit<RegisterBackendRequest, 'firebaseToken'>) => {
      const token = await firebaseAuth.getFirebaseToken()
      return await authApi.registerWithBackend({
        ...data,
        firebaseToken: token,
      })
    },
    onSuccess: (data) => {
      const accessToken = data.tokens?.accessToken
      setBackendCredentials(data.user, accessToken)
      toast.success('¡Perfil completado exitosamente!')
      navigate({ to: '/app/dashboard' })
    },
    onError: (error: any) => {
      console.error('Onboarding error:', error)
      toast.error(error.message || 'Error al completar el perfil')
    },
  })

  return {
    loginWithEmailMutation,
    loginWithGoogleMutation,
    registerWithEmailMutation,
    completeOnboardingMutation,
  }
}
