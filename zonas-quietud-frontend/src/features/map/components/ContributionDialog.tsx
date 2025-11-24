import { useState } from 'react'
import { MapPin, TrendingUp, Bell, LogIn } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RateStreetForm } from '@/features/ratings/components/RateStreetForm'
import { ReportIncidentForm } from '@/features/incidents/components/ReportIncidentForm'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from '@tanstack/react-router'

interface ContributionDialogProps {
  isOpen: boolean
  onClose: () => void
  streetId?: string
  streetName?: string
  district?: string
  defaultTab?: 'evaluate' | 'report'
}

export function ContributionDialog({
  isOpen,
  onClose,
  streetId,
  streetName = 'Av. Arequipa',
  district = 'Miraflores',
  defaultTab = 'evaluate',
}: Readonly<ContributionDialogProps>) {
  const [activeTab, setActiveTab] = useState<'evaluate' | 'report'>(defaultTab)
  const { backendUser } = useAuthStore()
  const navigate = useNavigate()

  // If not authenticated, show login prompt
  if (!backendUser) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" style={{ color: '#08A09C' }} />
              Autenticación Requerida
            </DialogTitle>
            <DialogDescription>
              Debes iniciar sesión para contribuir a la comunidad
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-6 pt-2">
            <p className="text-muted-foreground text-sm">
              Para evaluar zonas o reportar incidentes, necesitas tener una
              cuenta. Esto nos ayuda a mantener la calidad de la información y
              prevenir reportes falsos.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  navigate({ to: '/login' })
                }}
                className="flex-1"
                style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] max-w-3xl flex-col gap-0 p-0">
        <DialogHeader className="border-border shrink-0 border-b p-6 pb-4">
          <DialogTitle className="text-2xl">
            Contribuir a la Comunidad
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: '#08A09C' }} />
                <span className="text-foreground">{streetName}</span>
                <Badge variant="secondary">{district}</Badge>
              </div>
              <p className="text-sm">
                Elige cómo quieres contribuir: evalúa la zona o reporta un
                problema urgente
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="bg-muted/30 shrink-0 px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="evaluate" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Evaluar Zona
              </TabsTrigger>
              <TabsTrigger value="report" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Reportar Problema
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="evaluate" className="m-0 flex flex-1 flex-col">
            <RateStreetForm
              streetId={streetId}
              streetName={streetName}
              district={district}
              onCancel={onClose}
              onSuccess={onClose}
            />
          </TabsContent>

          <TabsContent value="report" className="m-0 flex flex-1 flex-col">
            <ReportIncidentForm
              streetId={streetId}
              streetName={streetName}
              district={district}
              onCancel={onClose}
              onSuccess={onClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
