'use client'
import React from 'react'

interface Props { title: string; value: string | number }

export default function StatCard({ title, value }: Props){
  return (
    <div className="flex-1 bg-[#fffaf0] p-3 rounded-2xl border border-orange-400 shadow-sm">
      <div className="text-center text-sm text-[#9b856f]">{title}</div>
      <div className="text-center text-2xl font-semibold text-[#2d1f16]">{value}</div>
    </div>
  )
}
