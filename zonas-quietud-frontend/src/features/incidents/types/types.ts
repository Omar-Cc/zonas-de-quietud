export type IncidentType =
  | 'robbery'
  | 'vandalism'
  | 'suspicious'
  | 'accident'
  | 'noise'
  | 'infrastructure'
  | 'lighting'
  | 'pollution'
  | 'other'

export type Severity = 'low' | 'medium' | 'high'
export type Urgency = 'low' | 'medium' | 'high'

export interface Location {
  latitude: number
  longitude: number
  accuracy?: number
}

export interface SubmitIncidentPayload {
  streetId: string
  userId: string
  incidentType: IncidentType
  severity: Severity
  urgency: Urgency
  description: string
  location: Location
  isAnonymous?: boolean
  notifyAuthorities?: boolean
  evidencePhotos?: string[]
}

export interface IncidentResponse {
  incidentId: string
  status: string
  createdAt: string
  message: string
}

// Map frontend incident types to backend enums
export const INCIDENT_TYPE_MAP = {
  robbery: 'ROBBERY',
  vandalism: 'VANDALISM',
  suspicious: 'SUSPICIOUS',
  accident: 'ACCIDENT',
  noise: 'NOISE',
  infrastructure: 'INFRASTRUCTURE',
  lighting: 'LIGHTING',
  pollution: 'POLLUTION',
  other: 'OTHER',
} as const

export const SEVERITY_MAP = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
} as const

export const URGENCY_MAP = {
  low: 'LOW',
  medium: 'MEDIUM',
  high: 'HIGH',
} as const
