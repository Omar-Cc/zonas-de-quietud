import { useState } from 'react'
import { UserProfileCard } from './UserProfileCard'
import { UserStatsGrid } from './UserStatsGrid'
import { ActivityChart } from './ActivityChart'
import { RecentActivityList } from './RecentActivityList'
import { AchievementsGrid } from './AchievementsGrid'
import { userData } from '../data/mockUserData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const unlockedAchievements = userData.achievements.filter(
    (a) => a.unlocked
  ).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            <UserProfileCard
              name={userData.name}
              avatar={userData.avatar}
              joinDate={userData.joinDate}
              level={userData.level}
              xp={userData.xp}
              nextLevelXp={userData.nextLevelXp}
              streakDays={userData.stats.streakDays}
              unlockedAchievements={unlockedAchievements}
              totalAchievements={userData.achievements.length}
              helpfulVotes={userData.stats.helpfulVotes}
            />

            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              <UserStatsGrid
                totalRatings={userData.stats.totalRatings}
                totalReports={userData.stats.totalReports}
              />
              <ActivityChart activityData={userData.activityData} />
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="contributions">Mis Contribuciones</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RecentActivityList
                contributions={userData.recentContributions}
                limit={5}
              />
              <AchievementsGrid
                achievements={userData.achievements}
                preview
                onViewAll={() => setActiveTab('achievements')}
              />
            </div>
          </TabsContent>

          {/* Contributions Tab */}
          <TabsContent value="contributions">
            <RecentActivityList
              contributions={userData.recentContributions}
              limit={100}
            />
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <AchievementsGrid achievements={userData.achievements} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
