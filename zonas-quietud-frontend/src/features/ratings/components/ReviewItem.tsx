import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { StarRating } from './starRating'
import type { Review } from '../types/types'

interface ReviewItemProps {
  review: Review
}

export function ReviewItem({ review }: Readonly<ReviewItemProps>) {
  return (
    <Card className="flex items-start gap-4 p-4">
      <Avatar>
        {review.avatar ? (
          <AvatarImage src={review.avatar} />
        ) : (
          <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
        )}
      </Avatar>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold">{review.author}</div>
            <div className="text-muted-foreground text-sm">{review.date}</div>
          </div>
          <div className="flex items-center gap-2">
            <StarRating value={review.rating} onChange={() => {}} size="sm" />
            <Badge variant="outline">{review.rating}</Badge>
          </div>
        </div>

        <p className="text-foreground/90 mt-3 text-sm">{review.text}</p>
      </div>
    </Card>
  )
}
