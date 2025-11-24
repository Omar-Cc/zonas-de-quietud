import { useEffect, useRef, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Polyline,
  Polygon,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { MapItem, ViewportBounds } from '../types/types'
import { getScoreColor } from '../constants/mapStyles'

// Componente auxiliar para exponer la instancia del mapa
function MapController({
  setMapInstance,
}: {
  setMapInstance: (map: L.Map) => void
}) {
  const map = useMap()

  useEffect(() => {
    setMapInstance(map)
  }, [map, setMapInstance])

  return null
}

// Viewport tracker component
function ViewportTracker({
  onViewportChange,
}: {
  onViewportChange: (bounds: ViewportBounds) => void
}) {
  const map = useMap()
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    const handleMoveEnd = () => {
      const bounds = map.getBounds()
      onViewportChange({
        minLat: bounds.getSouth(),
        minLng: bounds.getWest(),
        maxLat: bounds.getNorth(),
        maxLng: bounds.getEast(),
      })
    }

    // Trigger initial load only once
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true
      handleMoveEnd()
    }

    map.on('moveend', handleMoveEnd)
    return () => {
      map.off('moveend', handleMoveEnd)
    }
  }, [map, onViewportChange])

  return null
}

// --- PROPS DEL COMPONENTE ---
interface MapCanvasProps {
  mapItems: MapItem[]
  setMapInstance: (map: L.Map | null) => void
  onStreetClick: (street: any, event: any) => void
  hoveredStreet: string | null
  onStreetHover: (id: string | null) => void
  showLayers: boolean
  onViewportChange: (bounds: ViewportBounds) => void
}

export function MapCanvas({
  mapItems,
  setMapInstance,
  onStreetClick,
  hoveredStreet,
  onStreetHover,
  showLayers,
  onViewportChange,
}: Readonly<MapCanvasProps>) {
  const [, setHoveredStreet] = useState<string | null>(null)

  const handleStreetClick = (item: MapItem) => {
    const adaptedStreet = {
      ...item,
      district: 'Miraflores',
      reviews: 120,
      overallScore: item.score,
      security: item.score > 5 ? 8.0 : 4.0,
      noise: item.score > 5 ? 3.0 : 8.5,
      airQuality: 7.5,
    }
    onStreetClick(adaptedStreet, null)
  }

  return (
    <div className="relative z-0 h-full w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
      <MapContainer
        center={[-12.12, -77.03]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ background: '#f0f0f0' }}
      >
        <MapController setMapInstance={setMapInstance} />
        <ViewportTracker onViewportChange={onViewportChange} />

        {/* 1. CAPA BASE (CartoDB Voyager) */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* 2. CAPA HÍBRIDA (Calles y Zonas) */}
        {showLayers &&
          mapItems.map((item) =>
            item.type === 'street' ? (
              <Polyline
                key={item.id}
                positions={item.coordinates}
                pathOptions={{
                  color: getScoreColor(item.score),
                  weight: hoveredStreet === item.id ? 8 : 5,
                  opacity: hoveredStreet === item.id ? 1 : 0.7,
                }}
                eventHandlers={{
                  mouseover: () => setHoveredStreet(item.id),
                  mouseout: () => setHoveredStreet(null),
                  click: () => handleStreetClick(item),
                }}
              />
            ) : (
              <Polygon
                key={item.id}
                positions={item.coordinates}
                pathOptions={{
                  color: getScoreColor(item.score),
                  fillColor: getScoreColor(item.score),
                  fillOpacity: 0.4,
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => handleStreetClick(item),
                }}
              />
            )
          )}
      </MapContainer>
    </div>
  )
}
