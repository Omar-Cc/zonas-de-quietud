import { useState, useCallback, useRef, useEffect } from 'react'
import type { MapItem, ViewportBounds } from '../types/types'
import { fetchMapElements } from '../api/mapApi'

interface UseMapElementsReturn {
  mapItems: MapItem[]
  loading: boolean
  error: string | null
  refetch: (bounds: ViewportBounds) => void
}

/**
 * Custom hook to fetch map elements based on viewport bounds
 * Includes debouncing to prevent excessive API calls
 */
export function useMapElements(): UseMapElementsReturn {
  const [mapItems, setMapItems] = useState<MapItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debounceTimerRef = useRef<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const refetch = useCallback((bounds: ViewportBounds) => {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Debounce the API call by 500ms
    debounceTimerRef.current = setTimeout(async () => {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      setLoading(true)
      setError(null)

      try {
        const elements = await fetchMapElements(bounds)
        setMapItems(elements)
      } catch (err: any) {
        // Don't set error if request was aborted
        if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
          console.error('Error fetching map elements:', err)
          setError(
            err.response?.data?.mensaje || 'Error al cargar elementos del mapa'
          )
        }
      } finally {
        setLoading(false)
      }
    }, 500)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return { mapItems, loading, error, refetch }
}
