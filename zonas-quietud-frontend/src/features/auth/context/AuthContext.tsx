import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthService, UserData } from "@/features/auth/services/auth.service";

interface AuthContextType {
  user: UserData | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          // Fetch user details from backend
          try {
             const response = await AuthService.getCurrentUser(token);
             if (response.datos) {
                 setUser(response.datos);
             }
          } catch (error) {
             console.warn("Could not fetch backend user, falling back to Firebase profile", error);
             // Fallback to Firebase profile if backend fails (e.g. user not registered yet)
             setUser({ 
                id: currentUser.uid,
                email: currentUser.email || "",
                firstName: currentUser.displayName?.split(" ")[0] || "",
                lastName: currentUser.displayName?.split(" ").slice(1).join(" ") || "",
                photoURL: currentUser.photoURL
              });
          }
        } catch (error) {
          console.error("Error setting user session", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const token = await AuthService.loginWithGoogle();
    const response = await AuthService.loginBackend(token);
    if (response.datos) {
        setUser(response.datos);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
      const token = await AuthService.loginWithEmail(email, password);
      const response = await AuthService.loginBackend(token);
      if (response.datos) {
          setUser(response.datos);
      }
  };

  const registerWithEmail = async (email: string, password: string) => {
      await AuthService.registerWithEmail(email, password);
      // We don't call backend register here yet, as we need more details (step 2)
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, isAuthenticated: !!user, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
