import { type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AchievementBadge } from '@/components/achievementBadge'

interface Achievement {
  icon: LucideIcon
  title: string
  description: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress?: number
  total?: number
}

interface AchievementsGridProps {
  achievements: Achievement[]
  onViewAll?: () => void
  preview?: boolean
}

export function AchievementsGrid({
  achievements,
  onViewAll,
  preview = false,
}: Readonly<AchievementsGridProps>) {
  const displayedAchievements = preview
    ? achievements.filter((a) => a.unlocked).slice(0, 4)
    : achievements

  const gridCols = preview
    ? 'grid-cols-2'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{preview ? 'Logros Destacados' : 'Logros e Insignias'}</span>
          {preview && onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              Ver todos
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 ${gridCols}`}>
          {displayedAchievements.map((achievement, index) => (
            <AchievementBadge key={index} {...achievement} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
