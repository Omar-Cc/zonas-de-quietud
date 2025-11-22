import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
  data: Array<{
    subject: string;
    value: number;
    fullMark: number;
  }>;
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="currentColor" className="text-border" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "currentColor", fontSize: 12 }}
          className="text-foreground"
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 10]}
          tick={{ fill: "currentColor", fontSize: 10 }}
          className="text-muted-foreground"
        />
        <Radar
          name="Calificación"
          dataKey="value"
          stroke="#14b8a6"
          fill="#14b8a6"
          fillOpacity={0.6}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
