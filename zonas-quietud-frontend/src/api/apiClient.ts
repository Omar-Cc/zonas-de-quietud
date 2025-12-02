import axios from 'axios'
import { auth } from '@/config/firebase'
import { useAuthStore } from '@/store/authStore'
import { env } from '@/config/env'

const API_BASE_URL = env.apiUrl

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor para agregar el token de Firebase o Backend
apiClient.interceptors.request.use(
  async (config) => {
    // 1. Si ya hay un header de Authorization (ej: seteado manualmente), lo respetamos
    if (config.headers.Authorization) {
      return config
    }

    // 2. Intentamos usar el token del backend si existe
    const { backendToken } = useAuthStore.getState()
    if (backendToken) {
      config.headers.Authorization = `Bearer ${backendToken}`
      return config
    }

    // 3. Fallback: Usar token de Firebase si no hay token de backend
    // Esto es útil para endpoints públicos o durante el proceso de login/registro
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor para manejo global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes agregar lógica global de manejo de errores
    // Por ejemplo, redirigir a login si el token expiró
    if (error.response?.status === 401) {
      // Token inválido o expirado
      console.error('Unauthorized - Token may be expired')
    }
    return Promise.reject(error)
  }
)
