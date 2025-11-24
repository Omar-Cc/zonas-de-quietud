import { SCORE_LEGEND } from '../constants/mapStyles'

export function MapLegend() {
  return (
    <div className="border-border rounded-lg border bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:bg-gray-950/95">
      <h3 className="text-foreground mb-3 text-sm font-semibold">
        Calidad de Vida
      </h3>
      <div className="space-y-2">
        {SCORE_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            {/* Indicador de color */}
            <div
              className="h-3 w-8 rounded shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            {/* Texto descriptivo */}
            <div className="flex-1">
              <p className="text-foreground text-xs font-medium">
                {item.label}
              </p>
              <p className="text-muted-foreground text-[10px]">
                {item.min.toFixed(1)} -{' '}
                {item.max === 10 ? '10.0' : item.max.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
