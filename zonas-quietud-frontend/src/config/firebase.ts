// 1. Importar las funciones que necesitas del SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 2. Tu configuración usando las variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// 3. Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 4. Inicializar Servicios (Para tu caso: Autenticación)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Exportar app por si necesitas acceder a otros servicios luego
export default app;