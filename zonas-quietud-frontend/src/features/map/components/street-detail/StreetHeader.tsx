import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Plus,
  Share2,
  Bookmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface StreetHeaderProps {
  name: string
  district: string
  coordinates: string
  lastUpdated: string
  totalReviews: number
  overallScore: number
  isBookmarked: boolean
  onBookmarkToggle: () => void
  onContribute: () => void
  onBack: () => void
}

export function StreetHeader({
  name,
  district,
  coordinates,
  lastUpdated,
  totalReviews,
  overallScore,
  isBookmarked,
  onBookmarkToggle,
  onContribute,
  onBack,
}: Readonly<StreetHeaderProps>) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-lime-600'
    if (score >= 4) return 'text-yellow-600'
    if (score >= 2) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-50 border-green-200'
    if (score >= 6) return 'bg-lime-50 border-lime-200'
    if (score >= 4) return 'bg-yellow-50 border-yellow-200'
    if (score >= 2) return 'bg-orange-50 border-orange-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="mb-6">
      <Button variant="ghost" className="mb-4" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Mapa
      </Button>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-foreground text-4xl">{name}</h1>
            <Badge variant="secondary" className="text-base">
              {district}
            </Badge>
          </div>
          <div className="text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{coordinates}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Actualizado {lastUpdated}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{totalReviews} evaluaciones</span>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div
          className={`${getScoreBgColor(overallScore)} min-w-[160px] rounded-2xl border-2 p-6 text-center`}
        >
          <p className="text-muted-foreground mb-1">Calificación General</p>
          <div className={`text-5xl ${getScoreColor(overallScore)}`}>
            {overallScore.toFixed(1)}
          </div>
          <p className="text-muted-foreground mt-1">de 10.0</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <Button
          style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
          className="hover:opacity-90"
          onClick={onContribute}
        >
          <Plus className="mr-2 h-4 w-4" />
          Contribuir
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </Button>
        <Button variant="outline" onClick={onBookmarkToggle}>
          <Bookmark
            className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
          />
          {isBookmarked ? 'Guardado' : 'Guardar'}
        </Button>
      </div>
    </div>
  )
}
