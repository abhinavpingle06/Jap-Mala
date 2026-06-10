'use client'
import React, { useMemo, useState } from 'react'
import AnalyticsTabs from './AnalyticsTabs'
import AnalyticsChart from './AnalyticsChart'
import type { ViewMode, DailyJapaRecord } from '../lib/dashboardTypes'

function generateMockDaily(startDate: Date, days = 7) {
  const arr: DailyJapaRecord[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    arr.push({ date: d.toISOString(), count: Math.floor(Math.random() * 130) })
  }
  return arr
}

export default function ProgressAnalytics() {
  const [view, setView] = useState<ViewMode>('monthly')
  const [offset, setOffset] = useState(0) // pagination of ranges

  const data = useMemo(() => {
    if (view === 'weekly') {
      const start = new Date()
      start.setDate(start.getDate() - (6 - offset * 7))
      return generateMockDaily(start, 7)
    }
    if (view === 'monthly') {
      const start = new Date()
      start.setMonth(start.getMonth() - offset)
      const days = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
      return generateMockDaily(new Date(start.getFullYear(), start.getMonth(), 1), days)
    }
    // yearly
    const start = new Date()
    start.setFullYear(start.getFullYear() - offset)
    const d: DailyJapaRecord[] = []
    for (let m = 0; m < 12; m++) {
      d.push({ date: new Date(start.getFullYear(), m, 1).toISOString(), count: Math.floor(Math.random() * 3000) })
    }
    return d
  }, [view, offset])

  const rangeLabel = useMemo(() => {
    const now = new Date()
    if (view === 'weekly') {
      const start = new Date(now)
      start.setDate(now.getDate() - 6 + offset * 7)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      return `${start.toLocaleString('en-US', { month: 'short' })} ${String(start.getDate()).padStart(2, '0')} - ${end.toLocaleString('en-US', { month: 'short' })} ${String(end.getDate()).padStart(2, '0')}`
    }
    if (view === 'monthly') {
      const m = new Date(now.getFullYear(), now.getMonth() - offset, 1)
      return `${m.toLocaleString('en-US', { month: 'long' })} ${m.getFullYear()}`
    }
    const y = new Date(now.getFullYear() - offset, 0, 1)
    return `${y.getFullYear()}`
  }, [view, offset])

  return (
    <section className="p-4 rounded-3xl bg-[#fffaf0] shadow-sm border border-orange-400">
      <div className="flex items-center justify-between">
        <AnalyticsTabs view={view} onChange={(v) => { setView(v); setOffset(0) }} />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setOffset((s) => s - 1)}
          className="p-2 rounded-full bg-orange-400 text-xl text-white font-semibold shadow-sm"
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="text-orange-400 text-xl font-semibold">{rangeLabel}</div>
        <button
          onClick={() => setOffset((s) => Math.max(0, s + 1))}
          className="p-2 rounded-full bg-orange-400 text-xl text-white font-semibold shadow-sm"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <AnalyticsChart view={view} data={data} />
    </section>
  )
}
