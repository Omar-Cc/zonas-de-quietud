import { Star, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

type Contribution =
  | {
      id: number
      type: 'rating'
      street: string
      district: string
      score: number
      date: string
      likes: number
    }
  | {
      id: number
      type: 'report'
      street: string
      district: string
      incidentType: string
      date: string
      status: 'resolved' | 'pending'
    }

interface RecentActivityListProps {
  contributions: Contribution[]
  limit?: number
}

export function RecentActivityList({
  contributions,
  limit = 5,
}: Readonly<RecentActivityListProps>) {
  const displayedContributions = contributions.slice(0, limit)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {displayedContributions.map((contrib) => (
              <div
                key={contrib.id}
                className="bg-muted/50 flex items-start gap-3 rounded-lg p-3"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                    contrib.type === 'rating'
                      ? 'bg-primary/20'
                      : 'bg-orange-100 dark:bg-orange-900/20'
                  }`}
                >
                  {contrib.type === 'rating' ? (
                    <Star className="text-primary h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-foreground truncate">{contrib.street}</p>
                    <Badge variant="outline" className="text-xs">
                      {contrib.district}
                    </Badge>
                  </div>
                  {contrib.type === 'rating' ? (
                    <div className="flex items-center gap-2">
                      <Badge className="border-green-200 bg-green-100 text-green-700">
                        {contrib.score}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {contrib.likes} útiles
                      </span>
                    </div>
                  ) : (
                    <Badge
                      variant={
                        contrib.status === 'resolved' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {contrib.incidentType}
                    </Badge>
                  )}
                  <p className="text-muted-foreground mt-1 text-xs">
                    {contrib.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
