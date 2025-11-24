import { apiClient } from '@/api/apiClient'
import type {
  ViewportBounds,
  MapElementsResponse,
  ApiMapElement,
  MapItem,
} from '../types/types'

/**
 * Validate if coordinates are valid
 * Both streets and zones come as arrays of points from the API
 */
function isValidCoordinates(coords: any): boolean {
  if (!coords || !Array.isArray(coords) || coords.length === 0) return false

  // Both STREET and ZONE are arrays of [lat, lng] points
  return coords.every(
    (point) =>
      Array.isArray(point) &&
      point.length === 2 &&
      typeof point[0] === 'number' &&
      typeof point[1] === 'number' &&
      !Number.isNaN(point[0]) &&
      !Number.isNaN(point[1]) &&
      point[0] !== null &&
      point[1] !== null &&
      point[0] >= -90 &&
      point[0] <= 90 && // Valid latitude range
      point[1] >= -180 &&
      point[1] <= 180 // Valid longitude range
  )
}

/**
 * Fetch map elements within the given viewport bounds
 */
export async function fetchMapElements(
  bounds: ViewportBounds
): Promise<MapItem[]> {
  const response = await apiClient.get<MapElementsResponse>(
    '/api/v1/maps/elements',
    {
      params: {
        minLat: bounds.minLat,
        minLng: bounds.minLng,
        maxLat: bounds.maxLat,
        maxLng: bounds.maxLng,
      },
    }
  )

  console.log('API Response:', response.data)
  console.log('Total elements received:', response.data.datos.length)

  // Filter out elements with invalid coordinates and transform
  const validElements = response.data.datos.filter((element) => {
    const isValid = isValidCoordinates(element.coordinates)
    if (!isValid) {
      console.warn(
        'Invalid coordinates for element:',
        element.id,
        element.coordinates
      )
    }
    return isValid
  })

  console.log('Valid elements after filtering:', validElements.length)

  return validElements.map(transformApiElement)
}

/**
 * Transform API element to internal MapItem format
 */
function transformApiElement(apiElement: ApiMapElement): MapItem {
  const baseItem = {
    id: apiElement.id,
    name: apiElement.name,
    score: apiElement.score,
  }

  // Both STREET and ZONE have array of points as coordinates
  if (apiElement.type === 'STREET') {
    return {
      ...baseItem,
      type: 'street' as const,
      coordinates: apiElement.coordinates as [number, number][],
    }
  } else {
    // ZONE type - also an array of points (polygon)
    return {
      ...baseItem,
      type: 'zone' as const,
      coordinates: apiElement.coordinates as [number, number][],
    }
  }
}
