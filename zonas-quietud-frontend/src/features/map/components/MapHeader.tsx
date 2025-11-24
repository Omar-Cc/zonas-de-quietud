import { Menu, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MapHeaderProps {
  searchQuery: string
  onToggleSidebar: () => void
  onSearchChange: (value: string) => void
  onRateClick: () => void
}

export function MapHeader({
  searchQuery,
  onToggleSidebar,
  onSearchChange,
  onRateClick,
}: Readonly<MapHeaderProps>) {
  return (
    <div className="absolute top-4 right-4 left-4 z-30 flex items-center gap-4">
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
      <div className="max-w-md flex-1">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Buscar calle o dirección..."
            className="bg-white pl-10 shadow-lg dark:bg-gray-950"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Action Buttons */}
      <Button
        className="bg-primary hover:bg-primary/80 shadow-lg"
        onClick={onRateClick}
      >
        <Plus className="mr-2 h-4 w-4" />
        Contribuir
      </Button>
    </div>
  )
}
