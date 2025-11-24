import { useState } from "react";
import { X, Filter, AlertTriangle, Volume2, Wind, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [securityWeight, setSecurityWeight] = useState([70]);
  const [noiseWeight, setNoiseWeight] = useState([50]);
  const [airQualityWeight, setAirQualityWeight] = useState([60]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const districts = [
    "Miraflores",
    "San Isidro",
    "Barranco",
    "Surco",
    "La Molina",
    "San Borja",
  ];

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([
    "Miraflores",
  ]);

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}


      {/* Sidebar */}
      <div
        className={`w-80 bg-white dark:bg-gray-950 border-r border-border transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-foreground">Filtros</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Districts Selection */}
              <div>
                <Label className="text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
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
                  <AlertTriangle className="w-4 h-4" />
                  Seguridad
                </Label>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
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
                  <Volume2 className="w-4 h-4" />
                  Nivel de Ruido
                </Label>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
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
                  <Wind className="w-4 h-4" />
                  Calidad del Aire
                </Label>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
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
                <Label className="text-foreground mb-3">Opciones de Vista</Label>
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
          </ScrollArea>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button className="w-full">Aplicar Filtros</Button>
            <Button variant="outline" className="w-full">
              Restablecer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
