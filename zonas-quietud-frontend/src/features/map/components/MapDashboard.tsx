import { useState } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import { MapHeader } from './MapHeader'
import { MapControls } from './MapControls'
import { MapCanvas } from './MapCanvas'
import { MapOverlays } from './MapOverlays'
import { FilterSidebar } from './FilterSidebar'
import { MapLegend } from './MapLegend'
import { StreetPopup } from './streetPopup'
import { RatingForm } from '@/features/ratings/components/ratingForm'
import { IncidentReportForm } from '@/features/incidents/components/incidentReportForm'
import { useMapElements } from '../hooks/useMapElements'
import type { ViewportBounds } from '../types/types'

export function MapDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null)
  const [selectedStreet, setSelectedStreet] = useState<any | null>(null)
  const [showLayers, setShowLayers] = useState(true)

  const [hoveredStreet, setHoveredStreet] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false)
  const [isIncidentFormOpen, setIsIncidentFormOpen] = useState(false)
  const [streetToRate, setStreetToRate] = useState<{
    name: string
    district: string
  } | null>(null)

  // Use the custom hook to fetch map elements
  const { mapItems, loading, error, refetch } = useMapElements()

  const handleViewportChange = (bounds: ViewportBounds) => {
    refetch(bounds)
  }

  const handleZoomIn = () => mapInstance?.zoomIn()
  const handleZoomOut = () => mapInstance?.zoomOut()
  const handleCenterMap = () => mapInstance?.setView([-12.1111, -77.0316], 14)

  // Transform MapItem to Street structure for StreetPopup
  const transformToStreet = (item: any) => {
    // Check if it's already in the correct format
    if (item.overallScore !== undefined) {
      return item
    }

    // Transform MapItem to Street structure
    // Since MapItem only has a single score, we use it for all metrics
    return {
      id: item.id,
      name: item.name,
      district: 'Miraflores', // Placeholder - ideally from API
      overallScore: item.score,
      security: item.score * 0.9,
      noise: item.score * 0.95,
      airQuality: item.score * 0.85,
      reviews: 42, // Placeholder
      color:
        item.score >= 7 ? '#10b981' : item.score >= 5 ? '#eab308' : '#ef4444',
    }
  }

  const handleStreetClick = (street: any, event: any) => {
    // Transform the street data to match StreetPopup expectations
    const transformedStreet = transformToStreet(street)
    setSelectedStreet(transformedStreet)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="relative flex flex-1 overflow-hidden">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Map Area */}
        <div className="relative flex-1">
          <MapHeader
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onRateClick={() => setIsRatingFormOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onToggleLayers={() => setShowLayers(!showLayers)}
            onCenterMap={handleCenterMap}
          />

          {/* Legend - Bottom Right */}
          <div className="absolute right-6 bottom-6 z-30">
            <MapLegend />
          </div>

          {/* Map Canvas */}
          <MapCanvas
            mapItems={mapItems}
            setMapInstance={setMapInstance}
            onStreetClick={handleStreetClick}
            hoveredStreet={hoveredStreet}
            onStreetHover={setHoveredStreet}
            showLayers={showLayers}
            onViewportChange={handleViewportChange}
          />

          <MapOverlays showLayers={showLayers} />

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="rounded-lg bg-white p-4 shadow-xl dark:bg-gray-950">
                <div className="flex items-center gap-3">
                  <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                  <span className="text-sm font-medium">Cargando mapa...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="absolute top-20 left-1/2 z-50 -translate-x-1/2">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg dark:border-red-800 dark:bg-red-950">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Street Popup - External Custom Popup */}
          {selectedStreet && (
            <StreetPopup
              street={selectedStreet}
              onClose={() => setSelectedStreet(null)}
              onRate={(street) => {
                setStreetToRate({
                  name: street.name,
                  district: street.district,
                })
                setIsRatingFormOpen(true)
              }}
            />
          )}

          {/* Rating Form Modal */}
          <RatingForm
            isOpen={isRatingFormOpen}
            onClose={() => {
              setIsRatingFormOpen(false)
              setStreetToRate(null)
            }}
            streetName={streetToRate?.name}
            district={streetToRate?.district}
          />

          {/* Incident Report Form Modal */}
          <IncidentReportForm
            isOpen={isIncidentFormOpen}
            onClose={() => setIsIncidentFormOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}
