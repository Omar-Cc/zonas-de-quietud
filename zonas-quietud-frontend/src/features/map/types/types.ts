export type MapItemType = 'street' | 'zone'

// --- Core Map Item Types ---
export interface BaseMapItem {
  id: string // UUID from API
  name: string
  score: number
  type: MapItemType
}

export interface StreetMapItem extends BaseMapItem {
  type: 'street'
  coordinates: [number, number][] // Array of points for Polyline
}

export interface ZoneMapItem extends BaseMapItem {
  type: 'zone'
  coordinates: [number, number][] // Array of points for Polygon
}

export type MapItem = StreetMapItem | ZoneMapItem

// --- API Types ---
export interface ViewportBounds {
  minLat: number
  minLng: number
  maxLat: number
  maxLng: number
}

export interface ApiMapElement {
  id: string
  name: string
  type: 'STREET' | 'ZONE' // API uses uppercase
  score: number
  coordinates: [number, number][] | [number, number]
}

export interface MapElementsResponse {
  traceId: string
  timestamp: number
  status: number
  mensaje: string
  datos: ApiMapElement[]
}

export interface ApiErrorResponse {
  traceId: string
  timestamp: number
  status: number
  mensaje: string
  ruta?: string
}
