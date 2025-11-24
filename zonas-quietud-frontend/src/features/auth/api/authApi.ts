import { apiClient } from '@/api/apiClient'
import type {
  ApiResponse,
  UserData,
  LoginBackendResult,
  RegisterBackendRequest,
  AuthResponse,
} from '../types'

const API_BASE = '/api/v1/auth'

export const loginWithBackend = async (
  firebaseToken: string
): Promise<LoginBackendResult> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${API_BASE}/login`,
      { firebaseToken },
      {
        headers: {
          Authorization: '',
        },
      }
    )

    const esExitoso = response.data.exitoso || response.status === 200

    if (esExitoso && response.data.datos) {
      const datos = response.data.datos

      return {
        action: 'SUCCESS',
        user: datos.user,
        token: datos.tokens.accessToken,
      }
    }

    return { action: 'NEED_ONBOARDING' }
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { action: 'NEED_ONBOARDING' }
    }
    throw error
  }
}

export const registerWithBackend = async (
  data: RegisterBackendRequest
): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    `${API_BASE}/register`,
    data
  )

  const esExitoso =
    response.data.exitoso === true ||
    (response.status >= 200 && response.status < 300 && !!response.data.datos)

  if (!esExitoso || !response.data.datos) {
    throw new Error(response.data.mensaje || 'Error en el registro')
  }

  return response.data.datos
}

export const getCurrentUser = async (
  backendToken: string
): Promise<UserData> => {
  const response = await apiClient.get<ApiResponse<UserData>>(
    `${API_BASE}/me`,
    {
      headers: {
        Authorization: `Bearer ${backendToken}`,
      },
    }
  )

  const esExitoso =
    response.data.exitoso === true ||
    (response.status >= 200 && response.status < 300 && !!response.data.datos)

  if (!esExitoso || !response.data.datos) {
    throw new Error(response.data.mensaje || 'Error al obtener usuario')
  }

  return response.data.datos
}

export const logoutBackend = async (): Promise<void> => {
  try {
    await apiClient.post(`${API_BASE}/logout`)
  } catch (error) {
    console.warn('Error during backend logout:', error)
  }
}
