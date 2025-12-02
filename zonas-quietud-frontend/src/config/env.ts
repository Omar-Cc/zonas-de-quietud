/**
 * Configuración centralizada de variables de entorno
 * Este archivo es el único punto de acceso a las variables de entorno de la aplicación
 */

interface EnvConfig {
  // API Configuration
  apiUrl: string
  appUrl: string

  // Firebase Configuration
  firebase: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }

  // Environment
  isDevelopment: boolean
  isProduction: boolean
}

/**
 * Valida que una variable de entorno exista
 * @param key - Nombre de la variable de entorno
 * @param value - Valor de la variable de entorno
 * @throws Error si la variable no está definida
 */
function validateEnvVar(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Variable de entorno ${key} no está definida. Por favor, verifica tu archivo .env`
    )
  }
  return value
}

/**
 * Configuración de entorno de la aplicación
 * Todas las variables de entorno deben ser accedidas a través de este objeto
 */
export const env: EnvConfig = {
  apiUrl: validateEnvVar('VITE_API_URL', import.meta.env.VITE_API_URL),
  appUrl: validateEnvVar('VITE_APP_URL', import.meta.env.VITE_APP_URL),

  firebase: {
    apiKey: validateEnvVar(
      'VITE_FIREBASE_API_KEY',
      import.meta.env.VITE_FIREBASE_API_KEY
    ),
    authDomain: validateEnvVar(
      'VITE_FIREBASE_AUTH_DOMAIN',
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
    ),
    projectId: validateEnvVar(
      'VITE_FIREBASE_PROJECT_ID',
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    ),
    storageBucket: validateEnvVar(
      'VITE_FIREBASE_STORAGE_BUCKET',
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
    ),
    messagingSenderId: validateEnvVar(
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
    ),
    appId: validateEnvVar(
      'VITE_FIREBASE_APP_ID',
      import.meta.env.VITE_FIREBASE_APP_ID
    ),
  },

  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}
