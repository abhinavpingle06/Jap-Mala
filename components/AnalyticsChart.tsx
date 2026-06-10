'use client'
import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'
import type { DailyJapaRecord, ViewMode } from '../lib/dashboardTypes'

interface Props {
  view: ViewMode
  data: DailyJapaRecord[]
}

export default function AnalyticsChart({ view, data }: Props) {
  const chartData = useMemo(() => {
    // Data is provided as daily records; transform lightly for recharts
    return data.map((d) => ({ name: new Date(d.date).getDate().toString(), value: d.count }))
  }, [data])

  if (!data || data.length === 0) {
    return (
      <div className="mt-4 p-4 rounded-2xl bg-[#fffaf0] border border-[#f3e7d8] text-[#f4a340] text-center">
        <div className="inline-flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <path d="M3 3h18v18H3z" stroke="#f4a340" strokeWidth="1.2" fill="none"/>
          </svg>
          No Japa recorded
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 h-56">
      <ResponsiveContainer width="100%" height="100%">
              <LineChart
                  data={chartData}
                  margin={{ top: 10, left: -10, right: 10 ,bottom: 10 }}
              >
                  <CartesianGrid stroke="#f3e7d8" />

                  <XAxis dataKey="name" stroke="#2d1f16">
                      <Label 
                          value={view === 'yearly' ? 'Mahina' : 'Dinak'}
                          position="insideBottom"
                          offset={-10}
                      />
                  </XAxis>

                  <YAxis stroke="#2d1f16">
                      <Label
                          value="Japa Count"
                          angle={-90}
                          position="insideLeft"
                          offset={16}
                          style={{ textAnchor: 'middle' }}
                      />
                  </YAxis>

                  <Tooltip />

                  <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f4a340"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                  />
              </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
