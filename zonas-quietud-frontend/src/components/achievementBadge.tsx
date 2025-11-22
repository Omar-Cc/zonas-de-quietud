import { type LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
    progress?: number;
  total?: number;
  unlocked: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export function AchievementBadge({
  icon: Icon,
  title,
  description,
  progress = 0,
  total = 100,
  unlocked,
  rarity = "common",
}: AchievementBadgeProps) {
  const rarityColors = {
    common: "bg-gray-100 border-gray-300 text-gray-700",
    rare: "bg-blue-100 border-blue-300 text-blue-700",
    epic: "bg-purple-100 border-purple-300 text-purple-700",
    legendary: "bg-orange-100 border-orange-300 text-orange-700",
  };

  const rarityGlow = {
    common: "",
    rare: "shadow-blue-200",
    epic: "shadow-purple-200",
    legendary: "shadow-orange-200",
  };

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
        unlocked
          ? `${rarityColors[rarity]} ${rarityGlow[rarity]} shadow-lg`
          : "bg-muted border-muted-foreground/20 opacity-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
            unlocked ? "bg-white/50" : "bg-muted-foreground/10"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="truncate">{title}</h4>
            {unlocked && rarity !== "common" && (
              <Badge variant="outline" className="text-xs">
                {rarity === "rare" && "Raro"}
                {rarity === "epic" && "Épico"}
                {rarity === "legendary" && "Legendario"}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
          {!unlocked && total && (
            <div className="mt-2">
              <Progress value={(progress / total) * 100} className="h-1" />
              <p className="text-xs text-muted-foreground mt-1">
                {progress}/{total}
              </p>
            </div>
          )}
        </div>
      </div>
      {unlocked && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}
