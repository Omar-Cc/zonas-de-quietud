import {
  X,
  MapPin,
  AlertTriangle,
  Volume2,
  Wind,
  Users,
  TrendingUp,
  Plus,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ContributionDialog } from './ContributionDialog'
import { Link } from '@tanstack/react-router'

interface Street {
  id: string
  name: string
  district: string
  overallScore: number
  security: number
  noise: number
  airQuality: number
  reviews: number
  color: string
}

interface StreetPopupProps {
  street: Street
  onClose: () => void
  onRate?: (street: Street) => void
}

export function StreetPopup({ street, onClose, onRate }: StreetPopupProps) {
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false)
  const [contributionDefaultTab, setContributionDefaultTab] = useState<
    'evaluate' | 'report'
  >('evaluate')

  const getScoreLabel = (score: number) => {
    if (score >= 8) return { label: 'Excelente', color: 'bg-green-500' }
    if (score >= 6) return { label: 'Bueno', color: 'bg-lime-500' }
    if (score >= 4) return { label: 'Regular', color: 'bg-yellow-500' }
    if (score >= 2) return { label: 'Malo', color: 'bg-orange-500' }
    return { label: 'Crítico', color: 'bg-red-500' }
  }

  const scoreInfo = getScoreLabel(street.overallScore)

  return (
    <div className="border-border animate-in slide-in-from-right-10 absolute top-20 right-4 z-40 max-h-[calc(100vh-6rem)] w-96 overflow-y-auto rounded-xl border bg-white shadow-2xl duration-300 dark:bg-gray-950">
      {/* Header */}
      <div className="border-border sticky top-0 z-10 border-b bg-white/95 p-4 backdrop-blur dark:bg-gray-950/95">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4" />
              <h3 className="text-foreground text-lg font-bold">
                {street.name}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">{street.district}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Scrollable Area */}
      <div className="space-y-6 p-4">
        {/* Overall Score */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-foreground font-medium">
              Calificación General
            </span>
            <Badge className={scoreInfo.color}>{scoreInfo.label}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-foreground text-4xl font-bold">
              {street.overallScore.toFixed(1)}
            </div>
            <div className="flex-1 space-y-1">
              <Progress value={street.overallScore * 10} className="h-2.5" />
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Users className="h-3 w-3" />
                <span>{street.reviews} evaluaciones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="space-y-4">
          <h4 className="text-foreground text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Detalles
          </h4>

          {/* Security */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <span className="text-foreground">Seguridad</span>
              </div>
              <span className="text-foreground font-medium">
                {street.security.toFixed(1)}
              </span>
            </div>
            <Progress value={street.security * 10} className="h-2" />
          </div>

          {/* Noise */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-orange-500" />
                <span className="text-foreground">Nivel de Ruido</span>
              </div>
              <span className="text-foreground font-medium">
                {street.noise.toFixed(1)}
              </span>
            </div>
            <Progress value={street.noise * 10} className="h-2" />
          </div>

          {/* Air Quality */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-green-500" />
                <span className="text-foreground">Calidad del Aire</span>
              </div>
              <span className="text-foreground font-medium">
                {street.airQuality.toFixed(1)}
              </span>
            </div>
            <Progress value={street.airQuality * 10} className="h-2" />
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="border-border sticky bottom-0 space-y-3 border-t bg-white p-4 dark:bg-gray-950">
        <Button
          className="w-full shadow-md transition-all hover:shadow-lg"
          style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
          onClick={() => {
            setContributionDefaultTab('evaluate')
            setContributionDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Contribuir
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/app/detalles-calle" className="w-full">
            <Button variant="outline" className="w-full">
              Ver Detalles
            </Button>
          </Link>
          <Button variant="outline" className="w-full">
            <TrendingUp className="mr-2 h-4 w-4" />
            Comparar
          </Button>
        </div>
      </div>

      {/* Contribution Dialog */}
      <ContributionDialog
        isOpen={contributionDialogOpen}
        onClose={() => setContributionDialogOpen(false)}
        streetId={street.id}
        streetName={street.name}
        district={street.district}
        defaultTab={contributionDefaultTab}
      />
    </div>
  )
}
