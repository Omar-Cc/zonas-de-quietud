// Backend API Types
export interface UserData {
  id: string
  email: string
  firebaseUid: string
  firstName: string
  lastName: string
  avatarUrl?: string | null
  phone?: string
  birthDate?: number[] // [year, month, day]
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'
  membership?: 'FREE' | 'PREMIUM' | 'ENTERPRISE'
  isVerified?: boolean
  isActive?: boolean
  createdAt?: number[] // [year, month, day, hour, minute, second, nano]
  lastLoginAt?: number[] // [year, month, day, hour, minute, second, nano]
  loginCount?: number
  photoURL?: string // Legacy field, use avatarUrl instead
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
  | { action: 'SUCCESS'; user: UserData; token: string; refreshToken?: string }
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
