import { useState } from 'react'
import { submitRating } from '../api/ratingsApi'
import type { RatingPayload, RatingResponse } from '../types/types'

export function useSubmitRating() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (
    payload: RatingPayload
  ): Promise<RatingResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await submitRating(payload)
      return response
    } catch (err: any) {
      console.error('Error submitting rating:', err)
      const errorMessage =
        err.response?.data?.mensaje ||
        err.response?.data?.message ||
        'Error al enviar la evaluación'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error }
}
