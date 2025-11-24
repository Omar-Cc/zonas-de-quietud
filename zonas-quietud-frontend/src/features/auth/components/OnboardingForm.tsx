import { useForm } from '@tanstack/react-form'
import { Loader2, User, Calendar, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthMutation } from '../hooks/useAuthMutation'

export function OnboardingForm() {
  const { completeOnboardingMutation } = useAuthMutation()

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      birthDate: '',
      gender: 'PREFER_NOT_TO_SAY' as const,
    },
    onSubmit: async ({ value }) => {
      await completeOnboardingMutation.mutateAsync(value)
    },
  })

  const isLoading = completeOnboardingMutation.isPending

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--fondo) p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-(--principal)">
            Completa tu Perfil
          </CardTitle>
          <CardDescription>
            Necesitamos algunos datos adicionales para continuar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="firstName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Juan"
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

              <form.Field name="lastName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Pérez"
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
            </div>

            {/* Phone */}
            <form.Field name="phone">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
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

            {/* Birth Date */}
            <form.Field name="birthDate">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <div className="relative">
                    <Calendar className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="birthDate"
                      type="date"
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

            {/* Gender */}
            <form.Field name="gender">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as any)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Masculino</SelectItem>
                      <SelectItem value="FEMALE">Femenino</SelectItem>
                      <SelectItem value="OTHER">Otro</SelectItem>
                      <SelectItem value="PREFER_NOT_TO_SAY">
                        Prefiero no decirlo
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
              className="w-full bg-(--principal) text-white hover:bg-(--verde2)"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Completar Perfil
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
