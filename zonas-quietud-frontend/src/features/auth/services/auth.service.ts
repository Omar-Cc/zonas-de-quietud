import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider, type User as FirebaseUser, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { API_ROUTES } from "@/config/apiRoutes";

// Types based on the provided JSON contract
export interface ApiResponse<T> {
  traceId: string;
  timestamp: string;
  status: number;
  mensaje: string;
  descripcion: string;
  datos: T;
  codigoError: string;
  errores: Array<{
    codigo: string;
    campo: string;
    mensaje: string;
    valorRechazado: any;
  }>;
  paginacion?: {
    paginaActual: number;
    elementosPorPagina: number;
    totalElementos: number;
    totalPaginas: number;
    tieneSiguiente: boolean;
    tieneAnterior: boolean;
  };
}

export interface RegisterRequest {
  firebaseToken: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate?: string; // YYYY-MM-DD
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";
}

export interface LoginRequest {
  firebaseToken: string;
}

export interface UserData {
  // Define user properties returned by backend if known, otherwise generic
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  [key: string]: any;
}

export const AuthService = {
  // 1. Firebase Login (Google)
  loginWithGoogle: async (): Promise<string> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  },

  // 1.1 Firebase Login (Email/Password)
  loginWithEmail: async (email: string, password: string): Promise<string> => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const token = await user.getIdToken();
        return token;
    } catch (error) {
        console.error("Error logging in with Email:", error);
        throw error;
    }
  },

  // 1.2 Firebase Register (Email/Password)
  registerWithEmail: async (email: string, password: string): Promise<string> => {
      try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          const user = result.user;
          const token = await user.getIdToken();
          return token;
      } catch (error) {
          console.error("Error registering with Email:", error);
          throw error;
      }
  },

  // 2. Backend Login
  loginBackend: async (firebaseToken: string): Promise<ApiResponse<UserData>> => {
    const response = await fetch(API_ROUTES.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseToken }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error en el login del backend");
    }
    return response.json();
  },

  // 3. Backend Register
  registerBackend: async (data: RegisterRequest): Promise<ApiResponse<UserData>> => {
    const response = await fetch(API_ROUTES.AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

     if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error en el registro del backend");
    }
    return response.json();
  },

  // 4. Get Current User (Me)
  getCurrentUser: async (token: string): Promise<ApiResponse<UserData>> => {
      const response = await fetch(API_ROUTES.AUTH.ME, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`
          }
      });
      
      if (!response.ok) {
          throw new Error("Failed to fetch user");
      }
      return response.json();
  },

  // 5. Logout
  logout: async (): Promise<void> => {
    await firebaseSignOut(auth);
    // Optionally call backend logout if needed, though usually stateless JWT just needs client side removal
    // await fetch(API_ROUTES.AUTH.LOGOUT, { method: "POST" }); 
  }
};
