import { apiClient } from '@/api/apiClient'
import { API_PATHS } from '@/config/apiRoutes'
import type { SubmitIncidentPayload, IncidentResponse } from '../types/types'
import { INCIDENT_TYPE_MAP, SEVERITY_MAP, URGENCY_MAP } from '../types/types'

export async function submitIncident(
  payload: SubmitIncidentPayload
): Promise<IncidentResponse> {
  const transformedPayload = {
    ...payload,
    incidentType:
      INCIDENT_TYPE_MAP[payload.incidentType as keyof typeof INCIDENT_TYPE_MAP],
    severity: SEVERITY_MAP[payload.severity as keyof typeof SEVERITY_MAP],
    urgency: URGENCY_MAP[payload.urgency as keyof typeof URGENCY_MAP],
  }

  const response = await apiClient.post<IncidentResponse>(
    API_PATHS.INCIDENTS.SUBMIT,
    transformedPayload
  )

  return response.data
}
