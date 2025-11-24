import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface StreetQuickStatsProps {
  totalReviews: number
}

export function StreetQuickStats({
  totalReviews,
}: Readonly<StreetQuickStatsProps>) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Evaluaciones</span>
            <span className="text-foreground">{totalReviews}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Promedio del Mes</span>
            <span className="text-green-600">8.3</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tendencia</span>
            <Badge variant="default" className="bg-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +3.2%
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Ranking Distrito</span>
            <span className="text-foreground">#3 de 142</span>
          </div>
        </CardContent>
      </Card>

      {/* Compare CTA */}
      <Card className="from-primary/5 to-primary/10 border-primary/20 bg-linear-to-br">
        <CardContent className="pt-6">
          <h3 className="text-foreground mb-2">Comparar con Otras Calles</h3>
          <p className="text-muted-foreground mb-4">
            Analiza las diferencias con otras zonas de interés
          </p>
          <Button className="w-full">
            <TrendingUp className="mr-2 h-4 w-4" />
            Comenzar Comparación
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
