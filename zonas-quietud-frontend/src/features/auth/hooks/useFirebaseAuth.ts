import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '@/config/firebase'

const googleProvider = new GoogleAuthProvider()

/**
 * Hook personalizado para operaciones de Firebase Auth
 */
export const useFirebaseAuth = () => {
  /**
   * Login con email y contraseña
   */
  const loginWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  }

  /**
   * Registro con email y contraseña
   */
  const registerWithEmail = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const actionCodeSettings = {
      url: 'http://localhost:5173/confirm-email',
      handleCodeInApp: true,
    }

    await sendEmailVerification(userCredential.user, actionCodeSettings)

    return userCredential.user
  }

  /**
   * Login con Google
   */
  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider)
    return userCredential.user
  }

  /**
   * Reenviar email de verificación
   */
  const resendVerificationEmail = async () => {
    const user = auth.currentUser
    if (!user) {
      throw new Error('No hay usuario autenticado')
    }

    const actionCodeSettings = {
      url: 'http://localhost:5173/confirm-email',
      handleCodeInApp: true,
    }

    await sendEmailVerification(user, actionCodeSettings)
  }

  /**
   * Obtener token de Firebase
   */
  const getFirebaseToken = async () => {
    const user = auth.currentUser
    if (!user) {
      throw new Error('No hay usuario autenticado')
    }
    return await user.getIdToken()
  }

  return {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    resendVerificationEmail,
    getFirebaseToken,
  }
}
