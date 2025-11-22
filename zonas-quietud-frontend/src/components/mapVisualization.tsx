export function MapVisualization() {
  return (
    <div className="relative w-full h-full opacity-30">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid lines */}
        <g stroke="#14b8a6" strokeWidth="1" opacity="0.3">
          <line x1="0" y1="100" x2="800" y2="100" />
          <line x1="0" y1="200" x2="800" y2="200" />
          <line x1="0" y1="300" x2="800" y2="300" />
          <line x1="0" y1="400" x2="800" y2="400" />
          <line x1="0" y1="500" x2="800" y2="500" />
          
          <line x1="100" y1="0" x2="100" y2="600" />
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="300" y1="0" x2="300" y2="600" />
          <line x1="400" y1="0" x2="400" y2="600" />
          <line x1="500" y1="0" x2="500" y2="600" />
          <line x1="600" y1="0" x2="600" y2="600" />
          <line x1="700" y1="0" x2="700" y2="600" />
        </g>

        {/* Street paths - abstract representation */}
        <g stroke="#0d9488" strokeWidth="3" fill="none" opacity="0.5">
          <path d="M 50 150 Q 200 150 300 250 T 550 300" strokeLinecap="round" />
          <path d="M 150 50 Q 150 200 250 300 T 400 500" strokeLinecap="round" />
          <path d="M 600 100 Q 500 200 450 350 T 350 550" strokeLinecap="round" />
          <path d="M 100 400 Q 300 400 450 450 T 750 500" strokeLinecap="round" />
        </g>

        {/* Location markers */}
        <g>
          <circle cx="200" cy="200" r="8" fill="#14b8a6" opacity="0.7" />
          <circle cx="400" cy="300" r="8" fill="#14b8a6" opacity="0.7" />
          <circle cx="550" cy="400" r="8" fill="#14b8a6" opacity="0.7" />
          <circle cx="300" cy="450" r="8" fill="#14b8a6" opacity="0.7" />
          <circle cx="600" cy="250" r="8" fill="#f97316" opacity="0.8" />
          <circle cx="150" cy="350" r="8" fill="#f97316" opacity="0.8" />
        </g>

        {/* Connecting dots - smaller */}
        <g>
          <circle cx="250" cy="180" r="4" fill="#14b8a6" opacity="0.4" />
          <circle cx="480" cy="320" r="4" fill="#14b8a6" opacity="0.4" />
          <circle cx="350" cy="380" r="4" fill="#14b8a6" opacity="0.4" />
          <circle cx="500" cy="220" r="4" fill="#14b8a6" opacity="0.4" />
          <circle cx="180" cy="280" r="4" fill="#14b8a6" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
