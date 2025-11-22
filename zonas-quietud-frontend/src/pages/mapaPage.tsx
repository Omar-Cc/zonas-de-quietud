import { useState, useRef, useEffect } from "react";
import { Menu, ZoomIn, ZoomOut, Layers, Navigation, Search, Star, AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FilterSidebar } from "../components/filterSidebar";
import { MapLegend } from "../components/mapLegend";
import { StreetPopup } from "../components/streetPopup";
import { RatingForm } from "../components/ratingForm";
import { IncidentReportForm } from "../components/incidentReportForm";
import { Navbar } from "../components/layouts/navbar/navbar";

// Mock street data
const streets = [
  {
    id: 1,
    name: "Av. Arequipa",
    district: "Miraflores",
    path: "M 100 200 L 700 200",
    overallScore: 8.5,
    security: 8.2,
    noise: 5.5,
    airQuality: 7.8,
    reviews: 245,
    color: "#22c55e",
  },
  {
    id: 2,
    name: "Av. Pardo",
    district: "Miraflores",
    path: "M 200 100 L 200 500",
    overallScore: 7.8,
    security: 8.5,
    noise: 6.2,
    airQuality: 7.5,
    reviews: 189,
    color: "#84cc16",
  },
  {
    id: 3,
    name: "Calle Berlin",
    district: "Miraflores",
    path: "M 150 300 L 650 300",
    overallScore: 6.5,
    security: 7.0,
    noise: 5.8,
    airQuality: 6.8,
    reviews: 134,
    color: "#84cc16",
  },
  {
    id: 4,
    name: "Av. Benavides",
    district: "Miraflores",
    path: "M 400 100 L 400 500",
    overallScore: 5.2,
    security: 5.5,
    noise: 4.2,
    airQuality: 5.8,
    reviews: 201,
    color: "#eab308",
  },
  {
    id: 5,
    name: "Calle Schell",
    district: "Miraflores",
    path: "M 100 400 L 700 400",
    overallScore: 7.2,
    security: 7.8,
    noise: 6.5,
    airQuality: 7.0,
    reviews: 167,
    color: "#84cc16",
  },
  {
    id: 6,
    name: "Av. Angamos",
    district: "Miraflores",
    path: "M 600 100 L 600 500",
    overallScore: 4.5,
    security: 4.8,
    noise: 3.5,
    airQuality: 5.2,
    reviews: 298,
    color: "#eab308",
  },
  {
    id: 7,
    name: "Calle Tacna",
    district: "Miraflores",
    path: "M 250 150 L 550 450",
    overallScore: 3.8,
    security: 4.2,
    noise: 3.0,
    airQuality: 4.2,
    reviews: 112,
    color: "#f97316",
  },
  {
    id: 8,
    name: "Jr. Colina",
    district: "Miraflores",
    path: "M 350 120 L 450 480",
    overallScore: 8.8,
    security: 9.0,
    noise: 8.5,
    airQuality: 8.8,
    reviews: 423,
    color: "#22c55e",
  },
  {
    id: 9,
    name: "Av. Larco",
    district: "Miraflores",
    path: "M 500 130 L 580 470",
    overallScore: 2.5,
    security: 3.0,
    noise: 1.8,
    airQuality: 2.8,
    reviews: 534,
    color: "#f97316",
  },
  {
    id: 10,
    name: "Calle Porta",
    district: "Miraflores",
    path: "M 120 250 L 680 250",
    overallScore: 1.5,
    security: 2.0,
    noise: 1.2,
    airQuality: 1.3,
    reviews: 421,
    color: "#ef4444",
  },
];

export default function MapaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStreet, setSelectedStreet] = useState<typeof streets[0] | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [hoveredStreet, setHoveredStreet] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  const [streetToRate, setStreetToRate] = useState<{ name: string; district: string } | null>(null);
  const [isIncidentFormOpen, setIsIncidentFormOpen] = useState(false);
  // Zoom & pan state for simple interactions
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showLayers, setShowLayers] = useState(true);

  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleStreetClick = (street: typeof streets[0], event: React.MouseEvent) => {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setSelectedStreet(street);
  };

  // Controls: zoom, layers, center
  const zoomIn = () => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)));
  const toggleLayers = () => setShowLayers((s) => !s);
  const centerMap = () => setPan({ x: 0, y: 0 });
  const focusSearch = () => {
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  // When zoom/ pan changes, update transform on container
  useEffect(() => {
    const el = svgContainerRef.current;
    if (!el) return;
    el.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
    el.style.transformOrigin = `center center`;
  }, [zoom, pan]);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar isAuthenticated={true} userName="María García" notificationCount={3} />

      <div className="flex flex-1 relative overflow-hidden pt-[140px] lg:pt-[160px]">
        {/* Filter Sidebar */}
        <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Map Area */}
        <div className="flex-1 relative">
          {/* Top Controls Bar */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center gap-4">
            {/* Toggle Sidebar Button */}
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="bg-white dark:bg-gray-950 shadow-lg"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar calle o dirección..."
                  className="pl-10 bg-white dark:bg-gray-950 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2">
              <Button
                className="bg-orange-500 hover:bg-orange-600 shadow-lg"
                onClick={() => {
                  setStreetToRate({ name: "Av. Arequipa", district: "Miraflores" });
                  setIsRatingFormOpen(true);
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                Calificar
              </Button>
              <Button
                variant="secondary"
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
                onClick={() => setIsIncidentFormOpen(true)}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Reportar
              </Button>
            </div>
          </div>

          {/* Map Controls - Right Side */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white dark:bg-gray-950 shadow-lg"
              onClick={zoomIn}
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white dark:bg-gray-950 shadow-lg"
              onClick={zoomOut}
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white dark:bg-gray-950 shadow-lg"
              onClick={toggleLayers}
            >
              <Layers className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white dark:bg-gray-950 shadow-lg"
              onClick={centerMap}
            >
              <Navigation className="w-5 h-5" />
            </Button>
          </div>

          {/* Legend - Bottom Right */}
          <div className="absolute bottom-6 right-6 z-30">
            <MapLegend />
          </div>

          {/* Map SVG */}
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
            <div
              ref={svgContainerRef}
              className="w-full h-full transition-transform duration-200"
              style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center' }}
            >
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
              {/* Background Grid */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-gray-300 dark:text-gray-700"
                  />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />

              {/* District Background */}
              <rect
                x="80"
                y="80"
                width="640"
                height="440"
                fill="currentColor"
                className="text-gray-100 dark:text-gray-900"
                opacity="0.5"
              />

              {/* Streets */}
              <g className="streets">
                {streets.map((street) => (
                  <g key={street.id}>
                    {/* Street base (wider, semi-transparent) */}
                    <path
                      d={street.path}
                      stroke="#9ca3af"
                      strokeWidth="12"
                      fill="none"
                      opacity="0.3"
                    />
                    {/* Street heatmap color */}
                    <path
                      d={street.path}
                      stroke={street.color}
                      strokeWidth="8"
                      fill="none"
                      className={`cursor-pointer transition-all ${
                        hoveredStreet === street.id ? "brightness-110" : ""
                      }`}
                      style={{
                        filter: hoveredStreet === street.id ? "drop-shadow(0 0 8px rgba(0,0,0,0.3))" : "none",
                        strokeWidth: hoveredStreet === street.id ? "10" : "8",
                      }}
                      onClick={(e) => handleStreetClick(street, e)}
                      onMouseEnter={() => setHoveredStreet(street.id)}
                      onMouseLeave={() => setHoveredStreet(null)}
                    />
                  </g>
                ))}
              </g>

              {/* Street Labels (conditional) */}
              <g className="labels">
                <text x="400" y="210" textAnchor="middle" className="text-foreground" fontSize="10">
                  Av. Arequipa
                </text>
                <text x="210" y="180" textAnchor="middle" className="text-foreground" fontSize="10">
                  Av. Pardo
                </text>
                <text x="360" y="240" textAnchor="middle" className="text-foreground" fontSize="10">
                  Av. Benavides
                </text>
              </g>

              {/* Points of Interest */}
              <g className="poi">
                <circle cx="300" cy="250" r="6" fill="#3b82f6" opacity="0.7" />
                <circle cx="500" cy="300" r="6" fill="#3b82f6" opacity="0.7" />
                <circle cx="400" cy="350" r="6" fill="#3b82f6" opacity="0.7" />
              </g>
            </svg>

            {/* District Label Overlay */}
            <div className="absolute top-8 left-8 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-border">
              <p className="text-muted-foreground">Distrito</p>
              <h2 className="text-foreground">Miraflores</h2>
            </div>

            {/* Optional layers overlay (toggle) */}
            {!showLayers && (
              <div className="absolute inset-0 bg-white/60 dark:bg-black/50 flex items-center justify-center pointer-events-none">
                <p className="text-sm text-foreground/80">Capas ocultas</p>
              </div>
            )}

            {/* Stats Overlay */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm rounded-lg shadow-lg px-6 py-3 border border-border flex items-center gap-6">
              <div className="text-center">
                <p className="text-muted-foreground">Calles</p>
                <p className="text-foreground">142</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-muted-foreground">Evaluaciones</p>
                <p className="text-foreground">3,421</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-muted-foreground">Promedio</p>
                <p className="text-foreground">7.2</p>
              </div>
            </div>
          </div>

          {/* Street Popup */}
          {selectedStreet && (
            <StreetPopup
              street={selectedStreet}
              position={popupPosition}
              onClose={() => setSelectedStreet(null)}
              onRate={(street) => {
                setStreetToRate({ name: street.name, district: street.district });
                setIsRatingFormOpen(true);
              }}
            />
          )}

          {/* Rating Form Modal */}
          <RatingForm
            isOpen={isRatingFormOpen}
            onClose={() => {
              setIsRatingFormOpen(false);
              setStreetToRate(null);
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
    </div>
  );
}
