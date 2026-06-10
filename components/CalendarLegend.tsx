'use client'
import React from 'react'

export default function CalendarLegend(){
  return (
    <div className="mt-4 p-3 rounded-xl bg-[#fffaf0] border border-orange-400 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">✓</div><div className="text-sm text-[#2d1f16]">Japa Done</div></div>
      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center">✕</div><div className="text-sm text-[#2d1f16]">Missed</div></div>
      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md border-2 border-[#f4a340]"/><div className="text-sm text-[#2d1f16]">Today</div></div>
    </div>
  )
}
