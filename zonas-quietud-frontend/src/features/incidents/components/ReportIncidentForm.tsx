import { useState } from 'react'
import {
  AlertTriangle,
  Wind,
  Volume2,
  Upload,
  X,
  Camera,
  ShieldAlert,
  Loader2,
} from 'lucide-react'
import { useSubmitIncident } from '@/features/incidents/hooks/useSubmitIncident'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

const incidentTypes = [
  {
    value: 'robbery',
    label: 'Robo o Asalto',
    severity: 'high',
    icon: ShieldAlert,
  },
  {
    value: 'vandalism',
    label: 'Vandalismo',
    severity: 'medium',
    icon: AlertTriangle,
  },
  {
    value: 'suspicious',
    label: 'Actividad Sospechosa',
    severity: 'medium',
    icon: AlertTriangle,
  },
  {
    value: 'accident',
    label: 'Accidente de Tránsito',
    severity: 'high',
    icon: AlertTriangle,
  },
  {
    value: 'noise',
    label: 'Ruido Extremo Puntual',
    severity: 'low',
    icon: Volume2,
  },
  {
    value: 'infrastructure',
    label: 'Infraestructura Dañada',
    severity: 'medium',
    icon: AlertTriangle,
  },
  {
    value: 'lighting',
    label: 'Falta de Iluminación',
    severity: 'low',
    icon: AlertTriangle,
  },
  {
    value: 'pollution',
    label: 'Contaminación Severa',
    severity: 'medium',
    icon: Wind,
  },
  {
    value: 'other',
    label: 'Otro Problema',
    severity: 'low',
    icon: AlertTriangle,
  },
]

interface ReportIncidentFormProps {
  streetId?: string
  streetName: string
  district: string
  onCancel: () => void
  onSuccess: () => void
}

export function ReportIncidentForm({
  streetId,
  onCancel,
  onSuccess,
}: Readonly<ReportIncidentFormProps>) {
  const { submit, loading, error } = useSubmitIncident()
  const { backendUser } = useAuthStore()

  const [incidentType, setIncidentType] = useState('')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [urgency, setUrgency] = useState('medium')

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (photos.length + newFiles.length <= 5) {
        setPhotos([...photos, ...newFiles])
      } else {
        toast.error('Máximo 5 archivos permitidos')
      }
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const getCurrentLocation = (): Promise<{
    latitude: number
    longitude: number
    accuracy: number
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          reject(new Error(`Error getting location: ${error.message}`))
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!backendUser) {
      toast.error('Debes iniciar sesión para reportar un incidente')
      return
    }

    try {
      const location = await getCurrentLocation()

      const payload = {
        streetId: streetId || '00000000-0000-0000-0000-000000000000',
        userId: backendUser.id,
        incidentType: incidentType as any,
        severity:
          (incidentTypes.find((t) => t.value === incidentType)
            ?.severity as any) || 'medium',
        urgency: urgency as any,
        description,
        location,
        isAnonymous,
        notifyAuthorities: urgency === 'high', // Logic can be refined
        evidencePhotos: [], // TODO: Implement photo upload
      }

      const result = await submit(payload)

      if (result) {
        toast.success('¡Reporte enviado! Alertaremos a la comunidad y autoridades.')
        onSuccess()
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      toast.error(
        'Error al enviar el reporte. Por favor verifica tu ubicación e intenta nuevamente.'
      )
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#F44336'
      case 'medium':
        return '#FF9800'
      case 'low':
        return '#FFC107'
      default:
        return '#6EEB83'
    }
  }

  return (
    <>
      <ScrollArea className="h-85 max-h-[calc(90vh-280px)]">
        <div className="space-y-4 p-6">
          {/* Información explicativa */}
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="mt-0.5 h-5 w-5"
                style={{ color: '#FF9800' }}
              />
              <div className="text-sm">
                <p className="text-foreground mb-1">
                  <strong>Reporta un problema puntual y urgente</strong>
                </p>
                <p className="text-muted-foreground">
                  Usa este reporte para alertar sobre incidentes específicos que
                  requieren atención inmediata (robos, accidentes,
                  infraestructura dañada, etc.). Esto NO afecta el mapa de
                  calor, sino que genera alertas para la comunidad.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Incident Type */}
            <div className="space-y-3">
              <Label className="text-foreground">Tipo de Problema *</Label>
              <Select value={incidentType} onValueChange={setIncidentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de problema" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon
                            className="h-4 w-4"
                            style={{ color: getSeverityColor(type.severity) }}
                          />
                          {type.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Urgency Level */}
            <div className="space-y-3">
              <Label className="text-foreground">Nivel de Urgencia *</Label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: '#FFC107' }}
                      />
                      Baja - Puede esperar
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: '#FF9800' }}
                      />
                      Media - Atención pronto
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: '#F44336' }}
                      />
                      Alta - Requiere atención inmediata
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label className="text-foreground">
                Descripción del Problema *
              </Label>
              <Textarea
                placeholder="Describe el problema con el mayor detalle posible: ¿Qué pasó? ¿Cuándo? ¿Dónde exactamente?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
                required
              />
              <p className="text-muted-foreground text-xs">
                {description.length}/500 caracteres
              </p>
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Evidencia Fotográfica (Recomendado)
              </Label>
              <div className="border-border rounded-lg border-2 border-dashed p-4 text-center transition-colors hover:border-orange-500/50">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="incident-photo-upload"
                />
                <label
                  htmlFor="incident-photo-upload"
                  className="flex cursor-pointer flex-col items-center gap-2"
                >
                  <Upload className="text-muted-foreground h-6 w-6" />
                  <div className="text-sm">
                    <p className="text-foreground">
                      Sube fotos del problema (máx. 5)
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Las fotos ayudan a validar el reporte
                    </p>
                  </div>
                </label>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="border-border group relative aspect-square overflow-hidden rounded-lg border"
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Evidence ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="bg-destructive absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Anonymous Toggle */}
            <div className="border-border bg-card flex items-center justify-between rounded-lg border p-4">
              <div className="flex-1">
                <Label className="text-foreground">Reporte Anónimo</Label>
                <p className="text-muted-foreground mt-1 text-sm">
                  Tu identidad no será compartida públicamente
                </p>
              </div>
              <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
            </div>
          </form>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-border bg-muted/30 border-t p-6 pt-4">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex-1"
            style={{ backgroundColor: '#FF9800', color: '#FFFFFF' }}
            disabled={!incidentType || !description || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Reporte'
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mt-3 text-center text-xs">
          Tu reporte alertará a la comunidad y autoridades
        </p>
        {error && (
          <p className="text-destructive mt-2 text-center text-sm">{error}</p>
        )}
      </div>
    </>
  )
}
