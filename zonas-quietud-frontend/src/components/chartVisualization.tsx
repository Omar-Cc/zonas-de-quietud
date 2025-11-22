import { TrendingUp } from "lucide-react";

export function ChartVisualization() {
  const bars = [
    { height: 40, color: "#14b8a6" },
    { height: 65, color: "#14b8a6" },
    { height: 55, color: "#14b8a6" },
    { height: 80, color: "#f97316" },
    { height: 70, color: "#0d9488" },
    { height: 90, color: "#0d9488" },
  ];

  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-teal-50 to-white rounded-xl overflow-hidden border border-teal-100">
      <div className="absolute top-4 right-4">
        <TrendingUp className="w-6 h-6 text-teal-600" />
      </div>
      
      <div className="h-full flex items-end justify-center gap-3 px-8 pb-8">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-lg transition-all duration-300 hover:opacity-80"
            style={{
              height: `${bar.height}%`,
              backgroundColor: bar.color,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
      >
        <g stroke="#e5e7eb" strokeWidth="1" opacity="0.3">
          <line x1="0" y1="75" x2="400" y2="75" />
          <line x1="0" y1="150" x2="400" y2="150" />
          <line x1="0" y1="225" x2="400" y2="225" />
        </g>
      </svg>

      {/* Checkmarks */}
      <div className="absolute bottom-2 left-4 flex gap-2">
        {[1, 2, 3].map((check) => (
          <div
            key={check}
            className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center"
          >
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
