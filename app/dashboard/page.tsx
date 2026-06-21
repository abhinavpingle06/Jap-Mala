'use client'

import { useEffect, useState, useMemo } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import ProgressAnalytics from '../../components/ProgressAnalytics'
import JapaCalendar from '../../components/JapaCalendar'
import CalendarLegend from '../../components/CalendarLegend'
import StatCard from '../../components/StatCard'
import BottomNavigation from '../../components/BottomNavigation'
import type { UserStatistics } from '../../lib/dashboardTypes'

const defaultStats: UserStatistics = {
  todayCount: 0,
  current_streak: 0,
  highest_single_day: 0,
  total_lifetime_count: 0,
  completed_rounds: 0,
  days_practiced: 0,
}

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStatistics >(defaultStats)
  const [isOnline, setIsOnline] = useState(true)

  // detect online/offline
  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine)

    updateStatus()
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [isOnline])

  // fetch logic
  useEffect(() => {
    const loadData = async () => {
      if (isOnline) {
        console.log("online")
        const userObj = localStorage.getItem('NaamJaapID')
        if(!userObj){
          window.alert("User Data doesn't exists - Try login/signup again")
          return window.location.href  = '/login'
        }

        const userData = await JSON.parse(userObj)
        console.log(userData)
        const res = await fetch('/api/dashboard',{
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ uid: userData.uid })
        })
        const data = await res.json()
        console.log(data)
        setStats(data)   
        //Update the local storage
        localStorage.setItem(userData.uid, JSON.stringify(data))
      } else {
        console.log("offline")
        // OFFLINE → fallback to cache
        const cached = localStorage.getItem('NaamJaapID')
        console.log(cached)
        if (cached) {
          const obj = await JSON.parse(cached)
          const uid = obj.uid
          const cacheData = localStorage.getItem(uid)
          if(cacheData){
            setStats(JSON.parse(cacheData))
          } else {
            localStorage.setItem(uid,JSON.stringify(stats))
            setStats(stats)
          }         
        } else {
          setStats(stats)
        }
      }
    }
    loadData()
  }, [])

  const memoStats = useMemo(() => stats, [stats])

  return (
    <div className="min-h-screen bg-[#f8f0e5] pb-28">
      <div className="max-w-md mx-auto px-4">
        <DashboardHeader />

        <h2 className="mt-6 text-xl font-semibold text-[#2d1f16]">
          Japa Calendar
        </h2>

        <p className="text-sm text-[#9b856f]">
          {isOnline ? 'Online Mode' : 'Offline Mode'}
        </p>

        <JapaCalendar />
        <CalendarLegend />

        <div className="mt-4 p-full">
          <div className="mt-4 flex min-h-[250px] items-center justify-center rounded-3xl bg-[#fffaf0] border border-orange-200">
            <div className="text-center">
              <div className="flex justify-center mt-20 gap-2">
                <div className="h-4 w-4 animate-bounce rounded-full bg-orange-400"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-orange-400 [animation-delay:150ms]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-orange-400 [animation-delay:300ms]"></div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-orange-500">
                Analytics Coming Soon
              </h2>

              <p className="mt-2 text-gray-500">
                We're crafting powerful insights for your Japa journey.
              </p>
            </div>
          </div>
          {/* <ProgressAnalytics /> */}
        </div>

        <h2 className="mt-6 text-xl font-semibold text-[#2d1f16]">
          Quick Stats
        </h2>

        <div className="mt-3 flex flex-col items-center">
          {/* <StatCard title="Today's Count" value={memoStats.todayCount} /> */}
          <div className='max-w-[160px] w-full'>
            <StatCard title="Current Streak" value={memoStats.current_streak} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatCard title="Highest Single Day" value={memoStats.highest_single_day} />
          <StatCard title="Total Lifetime Count" value={memoStats.total_lifetime_count} />
          <StatCard title="Completed Rounds" value={memoStats.completed_rounds} />
          <StatCard title="Days Practiced" value={memoStats.days_practiced} />
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}