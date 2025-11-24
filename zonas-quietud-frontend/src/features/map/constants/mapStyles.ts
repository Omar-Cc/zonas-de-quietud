export interface ScoreRange {
  label: string;
  min: number;
  max: number;
  color: string; // Hex code para Leaflet
  tailwindClass: string; // Clase para Badges/Textos en UI
}

export const SCORE_LEGEND: ScoreRange[] = [
  { label: 'Excelente', min: 8.0, max: 10.0, color: '#22c55e', tailwindClass: 'text-green-500 bg-green-100' },
  { label: 'Bueno', min: 6.0, max: 7.9, color: '#84cc16', tailwindClass: 'text-lime-500 bg-lime-100' },
  { label: 'Regular', min: 4.0, max: 5.9, color: '#eab308', tailwindClass: 'text-yellow-500 bg-yellow-100' },
  { label: 'Malo', min: 2.0, max: 3.9, color: '#f97316', tailwindClass: 'text-orange-500 bg-orange-100' },
  { label: 'Crítico', min: 0.0, max: 1.9, color: '#ef4444', tailwindClass: 'text-red-500 bg-red-100' },
];

// Helper para obtener color basado en puntaje (Usado en MapCanvas)
export const getScoreColor = (score: number): string => {
  const found = SCORE_LEGEND.find((item) => score >= item.min && score <= item.max);
  return found ? found.color : '#94a3b8'; // Gris por defecto
};

// Helper para obtener clases Tailwind (Usado en Popups y Dashboard)
export const getScoreStyle = (score: number): string => {
  const found = SCORE_LEGEND.find((item) => score >= item.min && score <= item.max);
  return found ? found.tailwindClass : 'text-gray-500 bg-gray-100';
};