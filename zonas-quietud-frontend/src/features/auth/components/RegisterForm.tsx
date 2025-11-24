import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { Loader2, Mail, Lock, Eye, EyeOff, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthMutation } from '../hooks/useAuthMutation'
import { validatePasswordStrength } from '../schemas/authSchemas'
import { SocialAuthButton } from './SocialAuthButton'

export function RegisterForm() {
  const { registerWithEmailMutation, loginWithGoogleMutation } =
    useAuthMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      const validation = validatePasswordStrength(value.password)
      const isValid = Object.values(validation).every(Boolean)

      if (!isValid) {
        return
      }

      if (value.password !== value.confirmPassword) {
        return
      }

      await registerWithEmailMutation.mutateAsync(value)
    },
  })

  const isLoading =
    registerWithEmailMutation.isPending || loginWithGoogleMutation.isPending

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--fondo)] p-4">
      <Card className="w-full max-w-md border-[var(--border)] shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-[var(--principal)]">
            Crear Cuenta
          </CardTitle>
          <CardDescription>Regístrate para comenzar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => {
                const passwordStrength = validatePasswordStrength(
                  field.state.value
                )
                const showRequirements = field.state.value.length > 0

                return (
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pr-10 pl-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="text-muted-foreground h-4 w-4" />
                        ) : (
                          <Eye className="text-muted-foreground h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Password Requirements */}
                    {showRequirements && (
                      <div className="bg-muted/50 mt-2 space-y-1 rounded-md p-2 text-xs">
                        <p className="text-muted-foreground mb-1 font-medium">
                          Requisitos:
                        </p>
                        <ul className="space-y-1">
                          <li
                            className={`flex items-center gap-2 ${passwordStrength.minLength ? 'text-green-600' : 'text-muted-foreground'}`}
                          >
                            {passwordStrength.minLength ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                            Mínimo 6 caracteres
                          </li>
                          <li
                            className={`flex items-center gap-2 ${passwordStrength.hasUpperCase ? 'text-green-600' : 'text-muted-foreground'}`}
                          >
                            {passwordStrength.hasUpperCase ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                            Una mayúscula
                          </li>
                          <li
                            className={`flex items-center gap-2 ${passwordStrength.hasLowerCase ? 'text-green-600' : 'text-muted-foreground'}`}
                          >
                            {passwordStrength.hasLowerCase ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                            Una minúscula
                          </li>
                          <li
                            className={`flex items-center gap-2 ${passwordStrength.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}
                          >
                            {passwordStrength.hasNumber ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                            Un número
                          </li>
                          <li
                            className={`flex items-center gap-2 ${passwordStrength.hasSpecialChar ? 'text-green-600' : 'text-muted-foreground'}`}
                          >
                            {passwordStrength.hasSpecialChar ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                            Un carácter especial
                          </li>
                        </ul>
                      </div>
                    )}

                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    )}
                  </div>
                )
              }}
            </form.Field>

            {/* Confirm Password Field */}
            <form.Field name="confirmPassword">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pr-10 pl-10"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {field.state.meta.errors && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <X className="h-3 w-3" />
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className="w-full bg-[var(--principal)] text-white hover:bg-[var(--verde2)]"
              disabled={isLoading}
            >
              {registerWithEmailMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crear Cuenta
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground bg-[var(--fondo)] px-2">
                O registrarse con
              </span>
            </div>
          </div>

          <SocialAuthButton
            onClick={() => loginWithGoogleMutation.mutate()}
            disabled={isLoading}
            isLoading={loginWithGoogleMutation.isPending}
          />

          <div className="text-muted-foreground text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-[var(--principal)] underline hover:text-[var(--verde2)]"
            >
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
