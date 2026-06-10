'use client'
import React from 'react'
import type { ViewMode } from '../lib/dashboardTypes'

interface Props {
  view: ViewMode
  onChange: (v: ViewMode) => void
}

export default function AnalyticsTabs({ view, onChange }: Props) {
  return (
    <div className="inline-flex rounded-2xl bg-[#fffaf0] p-1 shadow-sm">
      {(['weekly', 'monthly', 'yearly'] as ViewMode[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === v
              ? 'bg-[#f4a340] text-white shadow-inner'
              : 'text-[#2d1f16] bg-transparent'
          }`}
        >
          {v[0].toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  )
}
