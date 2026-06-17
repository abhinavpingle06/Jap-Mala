'use client'
import React, { useMemo, useState } from 'react'
import type { CalendarDay } from '../lib/dashboardTypes'

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function buildCalendar(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1)
  const last = endOfMonth(first)

  // start from Monday
  const startWeekDay = (first.getDay() + 6) % 7 // 0..6 where 0 is Monday
  const days: CalendarDay[] = []

  const startDate = new Date(first)
  startDate.setDate(first.getDate() - startWeekDay)

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate)
    d.setDate(startDate.getDate() + i)
    const inMonth = d.getMonth() === month
    const today = new Date()
    const isToday = d.toDateString() === today.toDateString()
    const isFuture = d > today
    days.push({ date: d, inMonth, isToday, isFuture, count: inMonth ? 0 : undefined})
  }

  return days
}

export default function JapaCalendar() {
  
  const now = new Date()
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [badge, setBadge] = useState<{ text: string; x: number; y: number } | null>(null)

  const days = useMemo(() => buildCalendar(viewDate.getFullYear(), viewDate.getMonth()), [viewDate])

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }
  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  function handleDayClick(e: React.MouseEvent, day: CalendarDay) {
    if (!day.inMonth) return
    const count = day.count ?? 0
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setBadge({ text: `${count} Japa`, x: rect.left + rect.width / 2, y: rect.top })
    setTimeout(() => setBadge(null), 1800)
  }

  return (
    <div className="mt-6 p-4 rounded-3xl bg-[#fffaf0] border border-orange-400 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-2 rounded-full text-white font-semibold text-lg bg-orange-400/70 shadow-sm">‹</button>
              <div className="text-xl font-semibold text-orange-400">{viewDate.toLocaleString('en-US', { month: 'long' })} {viewDate.getFullYear()}</div>
              <button onClick={nextMonth} className="p-2 rounded-full text-white font-semibold text-lg bg-orange-400/70 shadow-sm">›</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-black mb-2">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=> <div key={d} className="text-center">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, idx) => {
          const cls = [] as string[]
          if (!day.inMonth) cls.push('bg-[#f3ebdf] text-[#b7a99a]')
          else cls.push('bg-white')
          if (day.count && day.count > 0) cls.push('bg-green-200')
          if (day.isToday) cls.push('border-2 border-[#f4a340]')
          return (
            <button
              key={idx}
              onClick={(e) => handleDayClick(e, day)}
                  className={`rounded-xl h-12 flex items-center justify-center text-sm shadow-sm font-semibold text-black ${cls.join(' ')}`}
            >
              {day.date.getDate()}
            </button>
          )
        })}
      </div>

      {badge && (
        <div style={{ position: 'fixed', left: badge.x - 48, top: badge.y - 48 }} className="px-3 py-1 rounded-xl bg-[#f4a340] text-white shadow-lg">
          {badge.text}
        </div>
      )}
    </div>
  )
}
