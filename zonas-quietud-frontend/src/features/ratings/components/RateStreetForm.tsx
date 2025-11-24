import { useState } from 'react'
import {
  AlertTriangle,
  Wind,
  Volume2,
  Accessibility,
  Heart,
  Upload,
  X,
  Camera,
  MessageSquare,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StarRating } from './starRating'
import { toast } from 'sonner'

interface RatingCriteria {
  id: string
  label: string
  icon: React.ElementType
  description: string
  value: number
}

import { useSubmitRating } from '../hooks/useSubmitRating'
import { useAuthStore } from '@/store/authStore'
import { Loader2 } from 'lucide-react'

// ... existing imports

interface RateStreetFormProps {
  streetId?: string
  streetName: string
  district: string
  onCancel: () => void
  onSuccess: () => void
}

export function RateStreetForm({
  streetId,
  streetName,
  district,
  onCancel,
  onSuccess,
}: Readonly<RateStreetFormProps>) {
  const { submit, loading, error } = useSubmitRating()
  const { backendUser } = useAuthStore()

  const [criteria, setCriteria] = useState<RatingCriteria[]>([
    // ... existing criteria
    {
      id: 'security',
      label: 'Seguridad',
      icon: AlertTriangle,
      description: '¿Qué tan segura te sientes en esta calle?',
      value: 7,
    },
    {
      id: 'air_quality',
      label: 'Calidad del Aire',
      icon: Wind,
      description: '¿Cómo percibes la calidad del aire?',
      value: 6,
    },
    {
      id: 'noise',
      label: 'Nivel de Ruido',
      icon: Volume2,
      description: '¿Qué tan ruidosa es esta zona normalmente?',
      value: 5,
    },
    {
      id: 'accessibility',
      label: 'Accesibilidad',
      icon: Accessibility,
      description: '¿Qué tan accesible es para todos?',
      value: 8,
    },
    {
      id: 'tranquility',
      label: 'Tranquilidad',
      icon: Heart,
      description: '¿Qué tan tranquila y agradable es?',
      value: 7,
    },
  ])
  const [comments, setComments] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [useStars, setUseStars] = useState(false)

  const handleCriteriaChange = (id: string, value: number) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, value } : c)))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const getCurrentLocation = (): Promise<{
    latitude: number
    longitude: number
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
          reject(error)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!backendUser) {
      toast.error('Debes iniciar sesión para evaluar una calle')
      return
    }

    try {
      const location = await getCurrentLocation()

      const detailedRatings = criteria.reduce((acc, curr) => {
        // Map frontend IDs to backend keys if needed, or ensure they match
        // Based on criteria IDs: security, air_quality, noise, accessibility, tranquility
        // Backend expects: security, airQuality, noise, accessibility, tranquility
        const key = curr.id === 'air_quality' ? 'airQuality' : curr.id
        acc[key] = curr.value
        return acc
      }, {} as any)

      const averageScore =
        criteria.reduce((sum, c) => sum + c.value, 0) / criteria.length

      const payload = {
        streetId: streetId || '00000000-0000-0000-0000-000000000000',
        userId: backendUser.id,
        overallScore: averageScore,
        detailedRatings,
        location,
        comments,
        ratingType: useStars ? 'STARS' : 'SLIDERS',
        photos: [], // TODO: Implement photo upload
      }

      const result = await submit(payload)

      if (result) {
        toast.success(
          '¡Gracias por tu evaluación! Contribuiste al mapa de calor.'
        )
        onSuccess()
      }
    } catch (err) {
      console.error('Error submitting rating:', err)
      toast.error('Error al enviar la evaluación. Verifica tu ubicación.')
    }
  }

  const averageScore =
    criteria.reduce((sum, c) => sum + c.value, 0) / criteria.length

  return (
    <>
      <ScrollArea className="h-85 max-h-[calc(90vh-280px)]">
        <div className="space-y-4 p-6">
          {/* Información explicativa */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 h-5 w-5" style={{ color: '#007BFF' }} />
              <div className="text-sm">
                <p className="text-foreground mb-1">
                  <strong>Evalúa la zona en general</strong>
                </p>
                <p className="text-muted-foreground">
                  Tu calificación se usa para generar el mapa de calor y ayudar
                  a otros ciudadanos a identificar las mejores zonas de Lima.
                  Evalúa basándote en tu experiencia general en esta calle.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Type Toggle */}
            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
              <span className="text-muted-foreground text-sm">
                Tipo de calificación
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!useStars ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUseStars(false)}
                >
                  Deslizadores
                </Button>
                <Button
                  type="button"
                  variant={useStars ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUseStars(true)}
                >
                  Estrellas
                </Button>
              </div>
            </div>

            {/* Criteria Ratings */}
            <div className="space-y-4">
              {criteria.map((criterion) => {
                const Icon = criterion.icon
                return (
                  <div
                    key={criterion.id}
                    className="border-border bg-card hover:border-primary/50 space-y-3 rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-1 items-start gap-3">
                        <div
                          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: '#08A09C20' }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: '#08A09C' }}
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-foreground text-base">
                            {criterion.label}
                          </Label>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {criterion.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className="min-w-12 text-right text-2xl"
                        style={{ color: '#08A09C' }}
                      >
                        {useStars
                          ? `${criterion.value}/10`
                          : criterion.value.toFixed(1)}
                      </div>
                    </div>

                    {useStars ? (
                      <div className="flex items-center justify-between">
                        <StarRating
                          value={Math.round(criterion.value / 2)}
                          onChange={(stars) =>
                            handleCriteriaChange(criterion.id, stars * 2)
                          }
                          size="lg"
                        />
                        <span className="text-muted-foreground text-sm">
                          {Math.round(criterion.value / 2)} de 5
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Slider
                          value={[criterion.value]}
                          onValueChange={(value) =>
                            handleCriteriaChange(criterion.id, value[0])
                          }
                          max={10}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="text-muted-foreground flex justify-between text-xs">
                          <span>Muy bajo</span>
                          <span>Excelente</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Average Score */}
            <div
              className="rounded-lg border p-4"
              style={{
                background:
                  'linear-gradient(to bottom right, #08A09C10, #08A09C20)',
                borderColor: '#08A09C40',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">Calificación Promedio</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl" style={{ color: '#08A09C' }}>
                    {averageScore.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">/10</span>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comentarios (Opcional)
              </Label>
              <Textarea
                placeholder="Comparte tu experiencia general en esta calle... ¿Qué la hace especial o qué se podría mejorar?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Fotografías (Opcional)
              </Label>
              <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed p-4 text-center transition-colors">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="evaluation-photo-upload"
                />
                <label
                  htmlFor="evaluation-photo-upload"
                  className="flex cursor-pointer flex-col items-center gap-2"
                >
                  <Upload className="text-muted-foreground h-6 w-6" />
                  <div className="text-sm">
                    <p className="text-foreground">Haz clic para subir fotos</p>
                    <p className="text-muted-foreground text-xs">
                      PNG, JPG hasta 10MB
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
                        alt={`Preview ${index + 1}`}
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
            style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Evaluación'
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mt-3 text-center text-xs">
          Tu evaluación se sumará al mapa de calor de la zona
        </p>
        {error && (
          <p className="text-destructive mt-2 text-center text-sm">{error}</p>
        )}
      </div>
    </>
  )
}
