import { TrendingUp, Award, Users, MapPin, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickAccessBarProps {
  onCategoryClick?: (category: string) => void;
}

export function QuickAccessBar({ onCategoryClick }: QuickAccessBarProps = {}) {
  const categories = [
    {
      id: "seguridad",
      icon: Shield,
      label: "Alta Seguridad",
      color: "#4CAF50",
      count: "1,245",
    },
    {
      id: "aire",
      icon: Sparkles,
      label: "Aire Limpio",
      color: "#8BC34A",
      count: "892",
    },
    {
      id: "ruido",
      icon: TrendingUp,
      label: "Bajo Ruido",
      color: "#08A09C",
      count: "1,567",
    },
    {
      id: "mejor-valoradas",
      icon: Award,
      label: "Mejor Valoradas",
      color: "#007BFF",
      count: "456",
    },
    {
      id: "mas-evaluadas",
      icon: Users,
      label: "Más Evaluadas",
      color: "#6EEB83",
      count: "2,103",
    },
  ];

  return (
    <div className="bg-white border-b border-border mb-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
          {/* Left - Categories title */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm" style={{ color: "#6c757d" }}>
              Explorar por:
            </span>
          </div>

          {/* Center - Category buttons */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 whitespace-nowrap hover:bg-accent"
                  onClick={() => onCategoryClick?.(category.id)}
                >
                  <Icon className="w-4 h-4" style={{ color: category.color }} />
                  <span className="hidden lg:inline">{category.label}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${category.color}20`,
                      color: category.color,
                    }}
                  >
                    {category.count}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Right - View all link */}
          <Button
            variant="link"
            size="sm"
            className="shrink-0 hidden md:flex"
            style={{ color: "#08A09C" }}
          >
            Ver todas las categorías
          </Button>
        </div>
      </div>
    </div>
  );
}
