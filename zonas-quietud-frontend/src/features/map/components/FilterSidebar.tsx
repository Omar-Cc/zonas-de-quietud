import { useState } from 'react'
import { X, Filter, AlertTriangle, Volume2, Wind, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterSidebar({
  isOpen,
  onClose,
}: Readonly<FilterSidebarProps>) {
  const [securityWeight, setSecurityWeight] = useState([70])
  const [noiseWeight, setNoiseWeight] = useState([50])
  const [airQualityWeight, setAirQualityWeight] = useState([60])
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [showLabels, setShowLabels] = useState(true)

  const districts = [
    'Miraflores',
    'San Isidro',
    'Barranco',
    'Surco',
    'La Molina',
    'San Borja',
  ]

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([
    'Miraflores',
  ])

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Sidebar */}
      <div
        className={`border-border top-0 bottom-0 left-0 h-full w-80 border-r bg-white transition-transform duration-300 dark:bg-gray-950 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Filter className="text-primary h-5 w-5" />
              <h2 className="text-foreground">Filtros</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-4">
              {/* Districts Selection */}
              <div>
                <Label className="text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Distritos
                </Label>
                <div className="space-y-2">
                  {districts.map((district) => (
                    <div
                      key={district}
                      className="flex items-center justify-between"
                    >
                      <Label htmlFor={district} className="cursor-pointer">
                        {district}
                      </Label>
                      <Switch
                        id={district}
                        checked={selectedDistricts.includes(district)}
                        onCheckedChange={() => toggleDistrict(district)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Security Filter */}
              <div>
                <Label className="text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Seguridad
                </Label>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex justify-between">
                    <span>Peso</span>
                    <span>{securityWeight[0]}%</span>
                  </div>
                  <Slider
                    value={securityWeight}
                    onValueChange={setSecurityWeight}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <Separator />

              {/* Noise Filter */}
              <div>
                <Label className="text-foreground mb-3 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Nivel de Ruido
                </Label>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex justify-between">
                    <span>Peso</span>
                    <span>{noiseWeight[0]}%</span>
                  </div>
                  <Slider
                    value={noiseWeight}
                    onValueChange={setNoiseWeight}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <Separator />

              {/* Air Quality Filter */}
              <div>
                <Label className="text-foreground mb-3 flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  Calidad del Aire
                </Label>
                <div className="space-y-2">
                  <div className="text-muted-foreground flex justify-between">
                    <span>Peso</span>
                    <span>{airQualityWeight[0]}%</span>
                  </div>
                  <Slider
                    value={airQualityWeight}
                    onValueChange={setAirQualityWeight}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <Separator />

              {/* Display Options */}
              <div>
                <Label className="text-foreground mb-3">
                  Opciones de Vista
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="heatmap" className="cursor-pointer">
                      Mostrar Heat Map
                    </Label>
                    <Switch
                      id="heatmap"
                      checked={showHeatmap}
                      onCheckedChange={setShowHeatmap}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="labels" className="cursor-pointer">
                      Mostrar Etiquetas
                    </Label>
                    <Switch
                      id="labels"
                      checked={showLabels}
                      onCheckedChange={setShowLabels}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-border space-y-2 border-t p-4">
            <Button className="w-full">Aplicar Filtros</Button>
            <Button variant="outline" className="w-full">
              Restablecer
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
