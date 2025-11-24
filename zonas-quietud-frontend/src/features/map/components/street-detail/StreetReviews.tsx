import { Star, Image as ImageIcon, ThumbsUp, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
  photos: number
  likes: number
}

interface StreetReviewsProps {
  reviews: Review[]
  totalReviews: number
}

export function StreetReviews({
  reviews,
  totalReviews,
}: Readonly<StreetReviewsProps>) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-lime-600'
    if (score >= 4) return 'text-yellow-600'
    if (score >= 2) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Comentarios Recientes</span>
          <Badge variant="secondary">{totalReviews} total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-border space-y-3 border-b pb-6 last:border-0"
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.user} />
                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="text-foreground">{review.user}</h4>
                      <span className="text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(review.rating / 2)
                                ? 'fill-orange-500 text-orange-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={getScoreColor(review.rating)}>
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {review.comment}
                    </p>
                    {review.photos > 0 && (
                      <div className="mb-3 flex items-center gap-2">
                        <ImageIcon className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                          {review.photos}{' '}
                          {review.photos === 1 ? 'foto' : 'fotos'}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Responder</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
