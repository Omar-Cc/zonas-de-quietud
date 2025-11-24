import { Star, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UserStatsGridProps {
  totalRatings: number
  totalReports: number
}

export function UserStatsGrid({
  totalRatings,
  totalReports,
}: Readonly<UserStatsGridProps>) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="from-primary/5 to-primary/10 border-primary/20 bg-linear-to-br">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg">
              <Star className="text-primary h-6 w-6" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-muted-foreground mb-1">Total Calificaciones</p>
          <p className="text-foreground mb-2 text-4xl">{totalRatings}</p>
          <Badge
            variant="secondary"
            className="border-green-200 bg-green-100 text-green-700"
          >
            +12 este mes
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 dark:border-orange-800 dark:from-orange-950/20 dark:to-orange-900/20">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-200 dark:bg-orange-900/40">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-muted-foreground mb-1">Reportes Realizados</p>
          <p className="text-foreground mb-2 text-4xl">{totalReports}</p>
          <Badge
            variant="secondary"
            className="border-orange-300 bg-orange-200 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
          >
            +3 este mes
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
