import { useState } from 'react'
import { submitIncident } from '../api/incidentsApi'
import type { SubmitIncidentPayload, IncidentResponse } from '../types/types'

export function useSubmitIncident() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (
    payload: SubmitIncidentPayload
  ): Promise<IncidentResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await submitIncident(payload)
      return response
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Error al enviar el reporte'
      setError(errorMessage)
      console.error('Error submitting incident:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setLoading(false)
  }

  return { submit, loading, error, reset }
}
