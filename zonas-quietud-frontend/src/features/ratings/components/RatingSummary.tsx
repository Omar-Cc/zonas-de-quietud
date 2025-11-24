import { Card } from '@/components/ui/card'
import { StarRating } from './starRating'
import { cn } from '@/lib/utils'
import type { Review } from '../types/types'

interface RatingSummaryProps {
  reviews: Review[]
}

export function RatingSummary({ reviews }: Readonly<RatingSummaryProps>) {
  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, reviews.length)
  ).toFixed(1)

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  return (
    <Card className="p-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-extrabold">{avg}</div>
          <div className="mt-2 flex items-center gap-2">
            <StarRating
              value={Math.round(Number(avg))}
              onChange={() => {}}
              size="lg"
            />
            <span className="text-muted-foreground text-sm">
              ({reviews.length} reseñas)
            </span>
          </div>
        </div>

        <div className="flex-1">
          {distribution.map((d) => {
            const pct = reviews.length ? (d.count / reviews.length) * 100 : 0
            return (
              <div key={d.star} className="mb-2 flex items-center gap-3">
                <span className="w-6 text-sm">{d.star}★</span>
                <div className="bg-muted h-3 flex-1 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      'h-full bg-linear-to-r from-amber-400 to-amber-600',
                      'rounded-full'
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm">{d.count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
