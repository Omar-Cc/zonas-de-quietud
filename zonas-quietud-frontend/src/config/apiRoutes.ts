import { env } from './env'

const API_URL = env.apiUrl

/**
 * Configuración centralizada de rutas de API
 * Este es el único lugar donde se definen las rutas de la API
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_URL}/api/v1/auth/login`,
    REGISTER: `${API_URL}/api/v1/auth/register`,
    REFRESH: `${API_URL}/api/v1/auth/refresh`,
    LOGOUT: `${API_URL}/api/v1/auth/logout`,
    ME: `${API_URL}/api/v1/auth/me`,
  },
  MAP: {
    ELEMENTS: `${API_URL}/api/v1/maps/elements`,
  },
  INCIDENTS: {
    SUBMIT: `${API_URL}/api/v1/incidents`,
  },
  RATINGS: {
    SUBMIT: `${API_URL}/api/v1/ratings`,
  },
} as const

/**
 * Rutas base para cada módulo (sin el dominio, solo el path)
 * Útil cuando se usa con apiClient que ya tiene el baseURL configurado
 */
export const API_PATHS = {
  AUTH: {
    BASE: '/api/v1/auth',
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
  },
  MAP: {
    BASE: '/api/v1/maps',
    ELEMENTS: '/api/v1/maps/elements',
  },
  INCIDENTS: {
    BASE: '/api/v1/incidents',
    SUBMIT: '/api/v1/incidents',
  },
  RATINGS: {
    BASE: '/api/v1/ratings',
    SUBMIT: '/api/v1/ratings',
  },
} as const
