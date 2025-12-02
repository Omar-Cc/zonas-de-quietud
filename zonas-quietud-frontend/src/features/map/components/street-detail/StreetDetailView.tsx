import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { StreetHeader } from './StreetHeader'
import { StreetMetrics } from './StreetMetrics'
import { StreetTrends } from './StreetTrends'
import { StreetReviews } from './StreetReviews'
import { StreetQuickStats } from './StreetQuickStats'
import { streetData } from '../../data/mockStreetData'
import { ContributionDialog } from '../ContributionDialog'

export function StreetDetailView() {
  const navigate = useNavigate()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false)
  const [contributionDefaultTab, setContributionDefaultTab] = useState<
    'evaluate' | 'report'
  >('evaluate')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <StreetHeader
          name={streetData.name}
          district={streetData.district}
          coordinates={streetData.coordinates}
          lastUpdated={streetData.lastUpdated}
          totalReviews={streetData.totalReviews}
          overallScore={streetData.overallScore}
          isBookmarked={isBookmarked}
          onBookmarkToggle={() => setIsBookmarked(!isBookmarked)}
          onContribute={() => {
            setContributionDefaultTab('evaluate')
            setContributionDialogOpen(true)
          }}
          onBack={() => navigate({ to: '/mapa' })}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <StreetMetrics
              categories={streetData.categories}
            />
            <StreetTrends trendData={streetData.trendData} />
            <StreetReviews
              reviews={streetData.reviews}
              totalReviews={streetData.totalReviews}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <StreetQuickStats totalReviews={streetData.totalReviews} />
          </div>
        </div>
      </div>

      {/* Contribution Dialog */}
      <ContributionDialog
        isOpen={contributionDialogOpen}
        onClose={() => setContributionDialogOpen(false)}
        defaultTab={contributionDefaultTab}
      />
    </div>
  )
}
