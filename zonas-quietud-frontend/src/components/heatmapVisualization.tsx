export function HeatmapVisualization() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-teal-50 to-white rounded-xl overflow-hidden border border-teal-100">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid background */}
        <g stroke="#e5e7eb" strokeWidth="1" opacity="0.3">
          <line x1="0" y1="75" x2="400" y2="75" />
          <line x1="0" y1="150" x2="400" y2="150" />
          <line x1="0" y1="225" x2="400" y2="225" />
          <line x1="100" y1="0" x2="100" y2="300" />
          <line x1="200" y1="0" x2="200" y2="300" />
          <line x1="300" y1="0" x2="300" y2="300" />
        </g>

        {/* Heatmap areas */}
        <g opacity="0.6">
          {/* Hot zone - orange */}
          <circle cx="120" cy="100" r="45" fill="#f97316" opacity="0.4" />
          <circle cx="120" cy="100" r="25" fill="#f97316" opacity="0.6" />
          
          {/* Medium zone - teal */}
          <circle cx="280" cy="180" r="50" fill="#14b8a6" opacity="0.3" />
          <circle cx="280" cy="180" r="30" fill="#14b8a6" opacity="0.5" />
          
          {/* Cool zone - blue */}
          <circle cx="200" cy="220" r="35" fill="#0d9488" opacity="0.3" />
          <circle cx="200" cy="220" r="20" fill="#0d9488" opacity="0.5" />
          
          {/* Small hot spots */}
          <circle cx="320" cy="80" r="30" fill="#f97316" opacity="0.35" />
          <circle cx="80" cy="240" r="25" fill="#14b8a6" opacity="0.4" />
        </g>

        {/* Street lines */}
        <g stroke="#0d9488" strokeWidth="2" fill="none" opacity="0.4">
          <path d="M 50 50 L 150 50 L 200 100 L 350 100" strokeLinecap="round" />
          <path d="M 100 30 L 100 120 L 150 180 L 150 270" strokeLinecap="round" />
          <path d="M 250 60 L 300 120 L 300 240" strokeLinecap="round" />
        </g>

        {/* Location pins */}
        <g>
          <circle cx="120" cy="100" r="5" fill="#f97316" />
          <circle cx="280" cy="180" r="5" fill="#14b8a6" />
          <circle cx="200" cy="220" r="5" fill="#0d9488" />
        </g>
      </svg>
    </div>
  );
}
