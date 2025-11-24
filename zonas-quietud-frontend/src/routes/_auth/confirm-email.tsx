import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getAuth, applyActionCode } from 'firebase/auth'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

// Validar los query params de Firebase
const searchSchema = (params: Record<string, unknown>) => {
  return {
    mode: params.mode as string,
    oobCode: params.oobCode as string,
  }
}

export const Route = createFileRoute('/_auth/confirm-email')({
  validateSearch: searchSchema,
  component: ConfirmEmailPage,
})

function ConfirmEmailPage() {
  const { mode, oobCode } = Route.useSearch()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const auth = getAuth()

  useEffect(() => {
    // Solo nos interesa verificar email
    if (mode !== 'verifyEmail') {
      setStatus('error')
      return
    }

    const verifyCode = async () => {
      try {
        // Esta función de Firebase valida el código y marca el email como verificado en la nube
        await applyActionCode(auth, oobCode)
        setStatus('success')
        toast.success('¡Correo verificado correctamente!')
      } catch (error) {
        console.error(error)
        setStatus('error')
        toast.error('El enlace es inválido o ha expirado.')
      }
    }

    verifyCode()
  }, [mode, oobCode, auth])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            {status === 'loading' && (
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-8 w-8 text-green-500" />
            )}
            {status === 'error' && <XCircle className="h-8 w-8 text-red-500" />}
          </div>
          <CardTitle>
            {status === 'loading' && 'Verificando tu correo...'}
            {status === 'success' && '¡Verificación Exitosa!'}
            {status === 'error' && 'Error de Verificación'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <p className="text-muted-foreground">
              Estamos validando tu enlace, espera un momento.
            </p>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Tu cuenta ha sido activada. Ya puedes acceder a todas las
                funciones.
              </p>
              <Button
                onClick={() => navigate({ to: '/app/dashboard' })}
                className="w-full"
              >
                Ir al Dashboard
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                El enlace ya fue usado o ha caducado. Intenta solicitar uno
                nuevo desde el login.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/login' })}
                className="w-full"
              >
                Volver al Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
