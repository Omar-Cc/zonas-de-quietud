import { apiClient } from '@/api/apiClient'
import { API_PATHS } from '@/config/apiRoutes'
import type { RatingPayload, RatingResponse } from '../types/types'

export async function submitRating(
  payload: RatingPayload
): Promise<RatingResponse> {
  const response = await apiClient.post<any>(API_PATHS.RATINGS.SUBMIT, payload)

  // Handle standard ApiResponse wrapper if present
  if (response.data && response.data.datos) {
    return response.data.datos
  }

  return response.data
}
