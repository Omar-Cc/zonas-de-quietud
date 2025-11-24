import { ZoomIn, ZoomOut, Layers, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onToggleLayers: () => void
  onCenterMap: () => void
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onToggleLayers,
  onCenterMap,
}: Readonly<MapControlsProps>) {
  return (
    <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-lg dark:bg-gray-950"
        onClick={onZoomIn}
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-lg dark:bg-gray-950"
        onClick={onZoomOut}
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-lg dark:bg-gray-950"
        onClick={onToggleLayers}
      >
        <Layers className="h-5 w-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-lg dark:bg-gray-950"
        onClick={onCenterMap}
      >
        <Navigation className="h-5 w-5" />
      </Button>
    </div>
  )
}
