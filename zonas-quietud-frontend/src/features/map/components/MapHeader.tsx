import { Menu, Search, Plus, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { MapItem } from '../types/types'

interface MapHeaderProps {
  searchQuery: string
  onToggleSidebar: () => void
  onSearchChange: (value: string) => void
  onRateClick: () => void
  searchResults?: MapItem[]
  onSelectStreet?: (street: MapItem) => void
  selectedStreet?: MapItem | null
}

export function MapHeader({
  searchQuery,
  onToggleSidebar,
  onSearchChange,
  onRateClick,
  searchResults = [],
  onSelectStreet,
  selectedStreet,
}: Readonly<MapHeaderProps>) {
  const showResults = searchQuery.trim() && searchResults.length > 0

  return (
    <div className="absolute top-2 right-4 left-32 z-30 flex items-center gap-4">
      {/* Toggle Sidebar Button */}
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggleSidebar}
        className="bg-white shadow-lg dark:bg-gray-950"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search Bar */}
      <div className="relative max-w-md flex-1">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Buscar calle o dirección..."
            className="bg-white pl-10 shadow-lg dark:bg-gray-950"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="border-border absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border bg-white shadow-xl dark:bg-gray-950">
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectStreet?.(item)
                }}
                className="hover:bg-muted/50 border-border flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0"
              >
                <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate font-medium">
                    {item.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {item.type === 'street' ? 'Calle' : 'Zona'} • Puntuación:{' '}
                    {item.score.toFixed(1)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <Button
        className="bg-primary hover:bg-primary/80 shadow-lg"
        onClick={onRateClick}
        disabled={!selectedStreet}
        title={
          selectedStreet
            ? `Contribuir para ${selectedStreet.name}`
            : 'Selecciona una calle primero'
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Contribuir
      </Button>
    </div>
  )
}
