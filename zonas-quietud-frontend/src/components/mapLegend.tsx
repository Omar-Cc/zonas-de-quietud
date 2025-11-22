export function MapLegend() {
  const legendItems = [
    { color: "#22c55e", label: "Excelente", range: "8.0 - 10.0" },
    { color: "#84cc16", label: "Bueno", range: "6.0 - 7.9" },
    { color: "#eab308", label: "Regular", range: "4.0 - 5.9" },
    { color: "#f97316", label: "Malo", range: "2.0 - 3.9" },
    { color: "#ef4444", label: "Crítico", range: "0.0 - 1.9" },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-border">
      <h3 className="text-foreground mb-3">Calidad de Vida</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className="w-8 h-3 rounded"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <p className="text-foreground">{item.label}</p>
              <p className="text-muted-foreground">{item.range}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
