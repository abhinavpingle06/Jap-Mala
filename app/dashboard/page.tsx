'use client'
import React, { useMemo } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import ProgressAnalytics from '../../components/ProgressAnalytics'
import JapaCalendar from '../../components/JapaCalendar'
import CalendarLegend from '../../components/CalendarLegend'
import StatCard from '../../components/StatCard'
import BottomNavigation from '../../components/BottomNavigation'
import type { UserStatistics } from '../../lib/dashboardTypes'

export default function DashboardPage(){
  // TODO: Replace mock with backend fetched user stats
  const stats: UserStatistics = useMemo(() => ({
    todayCount: 324,
    currentStreak: 5,
    highestSingleDay: 1080,
    lifetimeCount: 123456,
    completedRounds: 345,
    daysPracticed: 412,
  }), [])

  return (
    <div className="min-h-screen bg-[#f8f0e5] pb-28">
      <div className="max-w-md mx-auto px-4">
        <DashboardHeader />

        <h2 className="mt-6 text-xl font-semibold text-[#2d1f16]">Japa Calendar</h2>
        <p className="text-sm text-[#9b856f]">Your Japa Journey</p>
        <JapaCalendar />
        <CalendarLegend />

        <div className="mt-4">
            <ProgressAnalytics />
        </div>

        <h2 className="mt-6 text-xl font-semibold text-[#2d1f16]">Quick Stats</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <StatCard title="Today's Count" value={stats.todayCount} />
          <StatCard title="Current Streak" value={stats.currentStreak} />
          <StatCard title="Highest Single Day" value={stats.highestSingleDay} />
          <StatCard title="Total Lifetime Count" value={stats.lifetimeCount} />
          <StatCard title="Completed Rounds" value={stats.completedRounds} />
          <StatCard title="Days Practiced" value={stats.daysPracticed} />
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
