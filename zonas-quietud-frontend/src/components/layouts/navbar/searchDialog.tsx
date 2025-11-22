import { useState, useEffect } from "react";
import { Search, MapPin, Navigation, Map, Star, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  // Mock data para sugerencias
  const suggestions = [
    { type: "calle", name: "Av. Arequipa, Miraflores", rating: 4.2 },
    { type: "distrito", name: "Miraflores", rating: 4.5 },
    { type: "punto", name: "Parque Kennedy", rating: 4.8 },
    { type: "calle", name: "Av. Larco, Miraflores", rating: 4.0 },
    { type: "distrito", name: "San Isidro", rating: 4.6 },
    { type: "punto", name: "Malecón de Miraflores", rating: 4.7 },
  ];

  // Búsquedas recientes
  const recentSearches = [
    "Av. Arequipa, Miraflores",
    "San Isidro",
    "Barranco",
  ];

  // Distritos populares
  const popularDistricts = [
    { name: "Miraflores", rating: 4.5 },
    { name: "San Isidro", rating: 4.6 },
    { name: "Barranco", rating: 4.3 },
    { name: "Surco", rating: 4.4 },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.length > 0) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  };

  const handleGeolocation = () => {
    alert("Obteniendo tu ubicación...");
  };

  const handleSelectSuggestion = (name: string) => {
    setSearchValue(name);
    // Aquí navegarías a la página de resultados
    console.log("Navegando a:", name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-2" style={{ color: '#212529' }}>
            <Search className="w-5 h-5" style={{ color: '#08A09C' }} />
            Buscar en Zonas de Quietud
          </DialogTitle>
          <DialogDescription style={{ color: '#6c757d' }}>
            Encuentra calles, distritos o puntos de interés en Lima
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar calle, distrito o punto de interés..."
              className="pl-10 pr-32 h-12"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleGeolocation}
            >
              <Navigation className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Mi ubicación</span>
            </Button>
            {isSearching && (
              <Loader2 className="absolute right-36 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {/* Results or Suggestions */}
          {searchValue ? (
            // Search Results
            <div>
              <h4 className="text-sm mb-3" style={{ color: '#6c757d' }}>
                Resultados para "{searchValue}"
              </h4>
              <div className="space-y-2">
                {suggestions
                  .filter((s) =>
                    s.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 rounded-lg"
                      onClick={() => handleSelectSuggestion(suggestion.name)}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(8, 160, 156, 0.1)" }}
                      >
                        {suggestion.type === "calle" && (
                          <MapPin className="w-5 h-5" style={{ color: "#08A09C" }} />
                        )}
                        {suggestion.type === "distrito" && (
                          <Map className="w-5 h-5" style={{ color: "#08A09C" }} />
                        )}
                        {suggestion.type === "punto" && (
                          <Star className="w-5 h-5" style={{ color: "#6EEB83" }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{suggestion.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.type === "calle" && "Calle"}
                          {suggestion.type === "distrito" && "Distrito"}
                          {suggestion.type === "punto" && "Punto de interés"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{suggestion.rating}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            // Default view - Recent searches and popular districts
            <div className="space-y-6">
              {/* Recent Searches */}
              <div>
                <h4 className="text-sm mb-3" style={{ color: '#6c757d' }}>
                  Búsquedas recientes
                </h4>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center gap-3 rounded-lg"
                      onClick={() => handleSelectSuggestion(search)}
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Districts */}
              <div>
                <h4 className="text-sm mb-3" style={{ color: '#6c757d' }}>
                  Distritos populares
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {popularDistricts.map((district, index) => (
                    <button
                      key={index}
                      className="px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between rounded-lg border"
                      style={{ borderColor: '#CED4DA' }}
                      onClick={() => handleSelectSuggestion(district.name)}
                    >
                      <div className="flex items-center gap-2">
                        <Map className="w-4 h-4" style={{ color: '#08A09C' }} />
                        <span>{district.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{district.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
