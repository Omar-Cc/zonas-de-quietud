export interface DetailedRatings {
  security: number
  airQuality: number
  noise: number
  accessibility: number
  tranquility: number
}

export interface Location {
  latitude: number
  longitude: number
}

export interface RatingPayload {
  streetId: string
  userId: string
  overallScore: number
  detailedRatings: DetailedRatings
  location: Location
  comments?: string
  ratingType?: string // e.g., 'STARS' or 'SLIDERS'
  photos?: string[]
}

export interface RatingResponse {
  id: string
  streetId: string
  userId: string
  overallScore: number
  createdAt: string
}
