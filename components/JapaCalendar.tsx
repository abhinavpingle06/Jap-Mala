'use client'
import React, { useEffect, useMemo, useState } from 'react'
import type { CalendarDay } from '../lib/dashboardTypes'

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

interface Entry {
  japa_date: string,
  count:number,
  completed:boolean
 
// { japa_date: '2026-06-17', count: 10, completed: true }
// length
// :
// 1
// [[Prototype]]
// :
// Array(0)

}

function buildCalendar(year: number, month: number, entries: Entry[]): CalendarDay[] {
  const first = new Date(year, month, 1)

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
    const matchingEntry = entries.find(
      e => {
        const ed = new Date(e.japa_date);

        return (
          ed.getDate() === d.getDate() &&
          ed.getMonth() === d.getMonth() &&
          ed.getFullYear() === d.getFullYear()
        );
      }
    );

    const count = matchingEntry?.count ?? 0;
    // console.log(count)

    days.push({ date: d, inMonth, isToday, isFuture, count: count })
  }

  return days
}

export default function JapaCalendar() {
  
  // Getting Todays Full DAte Wed Jun 17 2026 14:30:45 GMT+0530
  const now = new Date()

  const [viewDate, setViewDate] = useState(new Date(
    // Creating a new date which will hold same month and year but starting date as 1 - Date(2026, 5, 1)
    now.getFullYear(), 
    now.getMonth(), 1
  ))
  const [entries, setEntries] = useState<Entry[]>([])
  const [popup, setPopup] = useState<{ text: string; x: number; y: number } | null>(null)
  const [creation_date, setCreation_date] = useState<Date | null>(null);

  useEffect(()=>{

    const userObj = localStorage.getItem('NaamJaapID')
    const user = JSON.parse(userObj!)

    const getEntries = async() => {
      const res = await fetch(`/api/calendar?userId=${user.uid}&month=${viewDate.getMonth()+1}&year=${viewDate.getFullYear()}`)
      const data = await res.json()
      console.log("FULL DATA:", data);
      console.log("entries:", data.entries);
      console.log("creationDate:", data.creationDate);
      console.log(data)
      setEntries(data.entries)
      setCreation_date(new Date(data.creationDate))
    }
    getEntries();
  },[viewDate])

  const days = useMemo(() => buildCalendar(viewDate.getFullYear(), viewDate.getMonth(), entries), [viewDate,entries])

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
    setPopup({ text: `${count} Japa`, x: rect.left + rect.width / 2, y: rect.top })
    setTimeout(() => setPopup(null), 1800)
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
          if (day.inMonth) cls.push('bg-[#f3ebdf] text-[#b7a99a]')
            else cls.push('bg-white')

          const creationDay = creation_date
            ? new Date(
              creation_date.getFullYear(),
              creation_date.getMonth(),
              creation_date.getDate()
            )
            : null;

          if (day.count !== 0) cls.push('bg-green-400')
          else if (
            creationDay &&
            day.date >= creationDay &&
            !day.isFuture &&
            !day.isToday
          ) {
            cls.push('bg-red-400')
          }
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

      {popup && (
        <div style={{ position: 'fixed', left: popup.x - 48, top: popup.y - 48 }} className="px-3 py-1 rounded-xl bg-[#f4a340] text-white shadow-lg">
          {popup.text}
        </div>
      )}
    </div>
  )
}
