import { create } from 'zustand'
import { type User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'
import type { UserData } from '@/features/auth/types'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  firebaseUser: FirebaseUser | null
  backendUser: UserData | null
  backendToken: string | null
  status: AuthStatus
  isEmailVerified: boolean

  syncFirebaseUser: (user: FirebaseUser | null) => void
  setBackendCredentials: (user: UserData, token: string) => void
  logout: () => Promise<void>
  setLoading: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  backendUser: null,
  backendToken: localStorage.getItem('authToken'),
  status: 'idle',
  isEmailVerified: false,

  syncFirebaseUser: (firebaseUser) => {
    set((state) => {
      if (!firebaseUser) {
        return {
          firebaseUser: null,
          status: 'unauthenticated',
          isEmailVerified: false,
        }
      }

      if (!state.backendToken) {
        return {
          firebaseUser,
          status: 'unauthenticated',
          isEmailVerified: firebaseUser.emailVerified,
        }
      }

      return {
        firebaseUser,
        status: 'authenticated',
        isEmailVerified: firebaseUser.emailVerified,
      }
    })
  },

  setBackendCredentials: (user, token) => {
    localStorage.setItem('authToken', token)
    set({
      backendUser: user,
      backendToken: token,
      status: 'authenticated',
    })
  },

  logout: async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('authToken')
      set({
        firebaseUser: null,
        backendUser: null,
        backendToken: null,
        status: 'unauthenticated',
        isEmailVerified: false,
      })
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  },

  setLoading: () => {
    set({ status: 'loading' })
  },
}))
