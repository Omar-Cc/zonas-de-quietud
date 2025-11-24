import { useState } from 'react'
import { Mail, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

export function VerifyEmailCard() {
  const { resendVerificationEmail } = useFirebaseAuth()
  const firebaseUser = useAuthStore((state) => state.firebaseUser)
  const [isResending, setIsResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const handleResendEmail = async () => {
    if (cooldown > 0) return

    setIsResending(true)
    try {
      await resendVerificationEmail()
      toast.success('Email de verificación enviado')

      // Cooldown de 60 segundos
      setCooldown(60)
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: any) {
      console.error('Error resending email:', error)
      toast.error(error.message || 'Error al enviar el email')
    } finally {
      setIsResending(false)
    }
  }

  const handleCheckVerification = () => {
    // Recargar la página para que el listener de Firebase actualice el estado
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--fondo)] p-4">
      <Card className="w-full max-w-md border-[var(--border)] shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--principal)]/10">
            <Mail className="h-8 w-8 text-[var(--principal)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[var(--principal)]">
            Verifica tu Email
          </CardTitle>
          <CardDescription>
            Hemos enviado un email de verificación a
          </CardDescription>
          <p className="text-sm font-medium text-[var(--principal)]">
            {firebaseUser?.email}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted/50 space-y-2 rounded-lg p-4">
            <p className="text-muted-foreground text-sm">
              <strong>Pasos a seguir:</strong>
            </p>
            <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
              <li>Revisa tu bandeja de entrada</li>
              <li>Abre el email de Zonas de Quietud</li>
              <li>Haz clic en el enlace de verificación</li>
              <li>Regresa aquí y verifica tu cuenta</li>
            </ol>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleCheckVerification}
              className="w-full bg-[var(--principal)] text-white hover:bg-[var(--verde2)]"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Ya Verifiqué mi Email
            </Button>

            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full"
              disabled={isResending || cooldown > 0}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isResending ? 'animate-spin' : ''}`}
              />
              {cooldown > 0
                ? `Reenviar en ${cooldown}s`
                : 'Reenviar Email de Verificación'}
            </Button>
          </div>

          <p className="text-muted-foreground text-center text-xs">
            ¿No recibiste el email? Revisa tu carpeta de spam o correo no
            deseado.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
