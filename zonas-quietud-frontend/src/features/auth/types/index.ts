// Backend API Types
export interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  birthDate?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'
  photoURL?: string
  isVerified?: boolean
}

// Estructura de los tokens que manda Spring Boot
export interface TokenData {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

// La respuesta compuesta del backend
export interface AuthResponse {
  user: UserData
  tokens: TokenData
}

export interface ApiResponse<T> {
  datos: T | null
  mensaje: string
  exitoso: boolean
}

// Auth API Responses
export type LoginBackendResult =
  | { action: 'SUCCESS'; user: UserData; token: string }
  | { action: 'NEED_ONBOARDING' }

export interface RegisterBackendRequest {
  firebaseToken: string
  firstName: string
  lastName: string
  phone?: string
  birthDate?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
}

export interface OnboardingFormData {
  firstName: string
  lastName: string
  phone?: string
  birthDate: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'
}
