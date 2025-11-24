import { Flame, Award, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

interface UserProfileCardProps {
  name: string
  avatar: string
  joinDate: string
  level: number
  xp: number
  nextLevelXp: number
  streakDays: number
  unlockedAchievements: number
  totalAchievements: number
  helpfulVotes: number
}

export function UserProfileCard({
  name,
  avatar,
  joinDate,
  level,
  xp,
  nextLevelXp,
  streakDays,
  unlockedAchievements,
  totalAchievements,
  helpfulVotes,
}: Readonly<UserProfileCardProps>) {
  const levelProgress = (xp / nextLevelXp) * 100

  return (
    <Card className="lg:w-80">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="border-primary h-24 w-24 border-4">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="bg-primary absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white dark:border-gray-950">
              <span className="text-primary-foreground">{level}</span>
            </div>
          </div>
          <h2 className="text-foreground mb-1">{name}</h2>
          <p className="text-muted-foreground mb-4">Miembro desde {joinDate}</p>

          {/* Level Progress */}
          <div className="mb-4 w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nivel {level}</span>
              <span className="text-muted-foreground">Nivel {level + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
            <p className="text-muted-foreground text-center text-xs">
              {xp} / {nextLevelXp} XP
            </p>
          </div>

          <Separator className="my-4" />

          {/* Quick Stats */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-muted-foreground text-sm">Racha</span>
              </div>
              <span className="text-foreground">{streakDays} días</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="text-primary h-4 w-4" />
                <span className="text-muted-foreground text-sm">Logros</span>
              </div>
              <span className="text-foreground">
                {unlockedAchievements}/{totalAchievements}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground text-sm">
                  Votos Útiles
                </span>
              </div>
              <span className="text-foreground">{helpfulVotes}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
