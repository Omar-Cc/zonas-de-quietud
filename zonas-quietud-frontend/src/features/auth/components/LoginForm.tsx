import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { Loader2, Mail, Lock } from 'lucide-react'
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
import { SocialAuthButton } from './SocialAuthButton'

export function LoginForm() {
  const { loginWithEmailMutation, loginWithGoogleMutation } = useAuthMutation()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await loginWithEmailMutation.mutateAsync(value)
    },
  })

  const isLoading =
    loginWithEmailMutation.isPending || loginWithGoogleMutation.isPending

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--fondo) p-4">
      <Card className="border-border w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-(--principal)">
            Iniciar Sesión
          </CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email/Password Form */}
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
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-(--principal) text-white hover:bg-(--verde2)"
              disabled={isLoading}
            >
              {loginWithEmailMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Iniciar Sesión
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground bg-(--fondo) px-2">
                O continuar con
              </span>
            </div>
          </div>

          {/* Google Login */}
          <SocialAuthButton
            onClick={() => loginWithGoogleMutation.mutate()}
            disabled={isLoading}
            isLoading={loginWithGoogleMutation.isPending}
          />

          {/* Register Link */}
          <div className="text-muted-foreground text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="text-(--principal) underline hover:text-(--verde2)"
            >
              Regístrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
