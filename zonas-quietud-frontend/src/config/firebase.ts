// 1. Importar las funciones que necesitas del SDK
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { env } from './env'

// 2. Tu configuración usando las variables de entorno centralizadas
const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
}

// 3. Inicializar Firebase
const app = initializeApp(firebaseConfig)

// 4. Inicializar Servicios (Para tu caso: Autenticación)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Exportar app por si necesitas acceder a otros servicios luego
export default app
