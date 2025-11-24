import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import * as authApi from '../api/authApi'
import { useAuthStore } from '@/store/authStore'

export const useUser = () => {
  const backendToken = useAuthStore((state) => state.backendToken)
  const firebaseUser = useAuthStore((state) => state.firebaseUser)
  const setBackendCredentials = useAuthStore(
    (state) => state.setBackendCredentials
  )
  const logout = useAuthStore((state) => state.logout)

  const query = useQuery({
    queryKey: ['currentUser', backendToken],
    queryFn: async () => {
      if (!backendToken) return null
      return await authApi.getCurrentUser(backendToken)
    },
    enabled: !!backendToken && !!firebaseUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.data && backendToken) {
      setBackendCredentials(query.data, backendToken)
    } else if (query.error && backendToken) {
      const error = query.error as any
      if (error?.response?.status === 401) {
        logout()
      } else {
        console.error('Error fetching user (no logout):', query.error)
      }
    }
  }, [query.data, query.error, backendToken, setBackendCredentials, logout])

  return query
}
