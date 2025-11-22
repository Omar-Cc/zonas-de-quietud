import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { AuthService } from "@/features/auth/services/auth.service";

export default function RegisterPage() {
  const { loginWithGoogle, registerWithEmail, firebaseUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Google/Email Auth, 2: Details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pwd: string) => {
    return {
      minLength: pwd.length >= 6,
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validatePassword(password);
    const isValid = Object.values(validation).every(Boolean);

    if (!isValid) {
      toast.error("La contraseña no cumple con los requisitos de seguridad");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    try {
      await registerWithEmail(email, password);
      // Step update handled by useEffect
    } catch (error: any) {
      console.error(error);
      toast.error("Error en el registro", {
        description: error.message || "Inténtalo de nuevo",
      });
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    gender: "PREFER_NOT_TO_SAY"
  });

  useEffect(() => {
    if (firebaseUser) {
      setStep(2);
      // Pre-fill name if available
      if (firebaseUser.displayName) {
        const names = firebaseUser.displayName.split(" ");
        setFormData(prev => ({
          ...prev,
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || ""
        }));
      }
    }
  }, [firebaseUser]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      // Step update handled by useEffect
    } catch (error: any) {
      console.error(error);
      toast.error("Error al autenticar con Google");
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseUser) {
      toast.error("No se encontró el token de autenticación");
      return;
    }

    setIsLoading(true);
    try {
      const token = await firebaseUser.getIdToken();
      await AuthService.registerBackend({
        firebaseToken: token,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender as any
      });
      toast.success("Registro exitoso");
      navigate({ to: "/" });
    } catch (error: any) {
      console.error(error);
      toast.error("Error en el registro", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--fondo)] p-4">
      <Card className="w-full max-w-md shadow-lg border-[var(--border)]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-[var(--principal)]">Crear una cuenta</CardTitle>
          <CardDescription>
            {step === 1 ? "Regístrate para comenzar" : "Completa tus datos personales"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="grid gap-4">
              <form onSubmit={handleEmailRegister} className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {/* Password Requirements */}
                  {password && (
                    <div className="text-xs space-y-1 mt-2 p-2 bg-muted/50 rounded-md">
                      <p className="font-medium text-muted-foreground mb-1">Requisitos:</p>
                      <ul className="space-y-1">
                        <li className={`flex items-center gap-2 ${password.length >= 6 ? "text-green-600" : "text-muted-foreground"}`}>
                          {password.length >= 6 ? <Check className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                          Mínimo 6 caracteres
                        </li>
                        <li className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[A-Z]/.test(password) ? <Check className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                          Una mayúscula
                        </li>
                        <li className={`flex items-center gap-2 ${/[a-z]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[a-z]/.test(password) ? <Check className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                          Una minúscula
                        </li>
                        <li className={`flex items-center gap-2 ${/[0-9]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[0-9]/.test(password) ? <Check className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                          Un número
                        </li>
                        <li className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-current" />}
                          Un carácter especial
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      required 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <X className="h-3 w-3" /> Las contraseñas no coinciden
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-[var(--principal)] hover:bg-[var(--verde2)] text-white" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Registrarse
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[var(--border)]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[var(--fondo)] px-2 text-muted-foreground">
                    O registrarse con
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={handleGoogleLogin} 
                disabled={isLoading}
                className="w-full relative"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                )}
                Google
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="underline text-[var(--principal)] hover:text-[var(--verde2)]">
                  Inicia sesión
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input 
                    id="firstName" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input 
                    id="lastName" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input 
                  id="birthDate" 
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => setFormData({...formData, gender: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Femenino</SelectItem>
                    <SelectItem value="OTHER">Otro</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefiero no decirlo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-[var(--principal)] hover:bg-[var(--verde2)] text-white" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Completar Registro
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
