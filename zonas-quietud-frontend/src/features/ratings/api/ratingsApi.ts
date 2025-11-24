import { apiClient } from '@/api/apiClient'
import type { RatingPayload, RatingResponse } from '../types/types'

const BASE_URL = '/api/v1/ratings'

export async function submitRating(
  payload: RatingPayload
): Promise<RatingResponse> {
  const response = await apiClient.post<any>(BASE_URL, payload)

  // Handle standard ApiResponse wrapper if present
  if (response.data && response.data.datos) {
    return response.data.datos
  }

  return response.data
}
