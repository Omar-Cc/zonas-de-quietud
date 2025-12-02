import { apiClient } from '@/api/apiClient'
import { API_PATHS } from '@/config/apiRoutes'
import type {
  ApiResponse,
  UserData,
  LoginBackendResult,
  RegisterBackendRequest,
  AuthResponse,
  TokenData,
} from '../types'

export const loginWithBackend = async (
  firebaseToken: string
): Promise<LoginBackendResult> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_PATHS.AUTH.LOGIN,
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
        refreshToken: datos.tokens.refreshToken,
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
    API_PATHS.AUTH.REGISTER,
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
    API_PATHS.AUTH.ME,
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
    await apiClient.post(API_PATHS.AUTH.LOGOUT)
  } catch (error) {
    console.warn('Error during backend logout:', error)
  }
}

export const refreshToken = async (
  refreshToken: string
): Promise<TokenData> => {
  const response = await apiClient.post<ApiResponse<TokenData>>(
    API_PATHS.AUTH.REFRESH,
    { refreshToken }
  )

  const esExitoso =
    response.data.exitoso === true ||
    (response.status >= 200 && response.status < 300 && !!response.data.datos)

  if (!esExitoso || !response.data.datos) {
    throw new Error(response.data.mensaje || 'Error al refrescar el token')
  }

  return response.data.datos
}
