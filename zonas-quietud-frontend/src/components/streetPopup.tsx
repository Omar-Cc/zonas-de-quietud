import { X, MapPin, AlertTriangle, Volume2, Wind, Users, TrendingUp, Star, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ContributionDialog } from "./contributionDialog";
import { Link } from "@tanstack/react-router";

interface Street {
  name: string;
  district: string;
  overallScore: number;
  security: number;
  noise: number;
  airQuality: number;
  reviews: number;
  color: string;
}

interface StreetPopupProps {
  street: Street;
  position: { x: number; y: number };
  onClose: () => void;
  onRate?: (street: Street) => void;
}

export function StreetPopup({ street, position, onClose, onRate }: StreetPopupProps) {
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false);
  const [contributionDefaultTab, setContributionDefaultTab] = useState<"evaluate" | "report">("evaluate");

  const getScoreLabel = (score: number) => {
    if (score >= 8) return { label: "Excelente", color: "bg-green-500" };
    if (score >= 6) return { label: "Bueno", color: "bg-lime-500" };
    if (score >= 4) return { label: "Regular", color: "bg-yellow-500" };
    if (score >= 2) return { label: "Malo", color: "bg-orange-500" };
    return { label: "Crítico", color: "bg-red-500" };
  };

  const scoreInfo = getScoreLabel(street.overallScore);

  return (
    <div
      className="fixed z-[100] w-80 bg-white dark:bg-gray-950 rounded-lg shadow-2xl border border-border animate-in fade-in-0 zoom-in-95"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%) translateY(-16px)",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="text-foreground">{street.name}</h3>
            </div>
            <p className="text-muted-foreground">{street.district}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground">Calificación General</span>
          <Badge className={scoreInfo.color}>{scoreInfo.label}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl text-foreground">{street.overallScore.toFixed(1)}</div>
          <div className="flex-1">
            <Progress value={street.overallScore * 10} className="h-2" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{street.reviews} evaluaciones</span>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="p-4 space-y-4">
        {/* Security */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Seguridad</span>
            </div>
            <span className="text-foreground">{street.security.toFixed(1)}</span>
          </div>
          <Progress value={street.security * 10} className="h-2" />
        </div>

        {/* Noise */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Nivel de Ruido</span>
            </div>
            <span className="text-foreground">{street.noise.toFixed(1)}</span>
          </div>
          <Progress value={street.noise * 10} className="h-2" />
        </div>

        {/* Air Quality */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Calidad del Aire</span>
            </div>
            <span className="text-foreground">{street.airQuality.toFixed(1)}</span>
          </div>
          <Progress value={street.airQuality * 10} className="h-2" />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          className="w-full"
          style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
          onClick={() => {
            setContributionDefaultTab("evaluate");
            setContributionDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Contribuir
        </Button>
        <Link to="/app/detallesCalles">
          <Button variant="outline" className="w-full">
            Ver Detalles Completos
          </Button>
        </Link>
        <Button variant="outline" className="w-full">
          <TrendingUp className="w-4 h-4 mr-2" />
          Comparar con Otras
        </Button>
      </div>

      {/* Arrow pointing to street */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white dark:border-t-gray-950"
      />

      {/* Contribution Dialog */}
      <ContributionDialog
        isOpen={contributionDialogOpen}
        onClose={() => setContributionDialogOpen(false)}
        streetName={street.name}
        district={street.district}
        defaultTab={contributionDefaultTab}
      />
    </div>
  );
}
