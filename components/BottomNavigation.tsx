'use client'
import React from 'react'
import { Home, BarChart2, Grid, Settings } from 'lucide-react'

export default function BottomNavigation(){
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] bg-[#fffaf0] border border-[#f3e7d8] rounded-3xl p-3 flex justify-between items-center shadow-md z-20">
      <button onClick={()=> alert("Profile Under Construction")} className="flex flex-col items-center text-[#9b856f]">
        <Home size={20} />
        <div className="text-xs">Home</div>
      </button>
      <button onClick={() => window.location.href = "/jap"} className="flex flex-col items-center text-[#9b856f]">
        <BarChart2 size={20} />
        <div className="text-xs">📿Jaap📿</div>
      </button>
      <button onClick={() => window.location.href = "/dashboard"} className="flex flex-col items-center text-[#f4a340]">
        <Grid size={20} />
        <div className="text-xs">Statistics</div>
      </button>
      <button className="flex flex-col items-center text-[#9b856f]">
        <Settings size={20} />
        <div className="text-xs">Settings</div>
      </button>
    </nav>
  )
}
