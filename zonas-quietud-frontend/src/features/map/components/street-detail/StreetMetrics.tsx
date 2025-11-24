import {
  AlertTriangle,
  Wind,
  Volume2,
  Accessibility,
  Heart,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { RadarChart } from '@/components/radarChart'

const categoryIcons = {
  Seguridad: AlertTriangle,
  'Calidad del Aire': Wind,
  'Nivel de Ruido': Volume2,
  Accesibilidad: Accessibility,
  Tranquilidad: Heart,
}

interface Category {
  name: string
  value: number
  change: number
}

interface ExternalMetric {
  label: string
  value: string
  status: 'positive' | 'neutral' | 'negative'
  score: number
}

interface StreetMetricsProps {
  categories: Category[]
  externalMetrics: ExternalMetric[]
}

export function StreetMetrics({
  categories,
  externalMetrics,
}: Readonly<StreetMetricsProps>) {
  const radarData = categories.map((cat) => ({
    subject: cat.name,
    value: cat.value,
    fullMark: 10,
  }))

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-lime-600'
    if (score >= 4) return 'text-yellow-600'
    if (score >= 2) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    if (status === 'positive')
      return 'text-green-600 bg-green-50 border-green-200'
    if (status === 'neutral')
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  return (
    <div className="space-y-6">
      {/* Categories Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Desglose por Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bars" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="bars">Barras</TabsTrigger>
              <TabsTrigger value="radar">Radar</TabsTrigger>
            </TabsList>

            <TabsContent value="bars" className="space-y-4">
              {categories.map((category) => {
                const IconComponent =
                  categoryIcons[category.name as keyof typeof categoryIcons]
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="text-muted-foreground h-4 w-4" />
                        )}
                        <span className="text-foreground">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-lg ${getScoreColor(category.value)}`}
                        >
                          {category.value.toFixed(1)}
                        </span>
                        {category.change !== 0 && (
                          <Badge
                            variant={
                              category.change > 0 ? 'default' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {category.change > 0 ? (
                              <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(category.change).toFixed(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={category.value * 10} className="h-3" />
                  </div>
                )
              })}
            </TabsContent>

            <TabsContent value="radar">
              <div className="h-[400px]">
                <RadarChart data={radarData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* External Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas Externas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {externalMetrics.map((metric, index) => (
            <div
              key={index}
              className={`rounded-lg border p-3 ${getStatusColor(metric.status)}`}
            >
              <p className="mb-1 text-sm">{metric.label}</p>
              <p className="font-medium">{metric.value}</p>
              <Progress value={metric.score * 10} className="mt-2 h-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
