'use client'

import { ReactNode } from 'react'

interface MobileShellProps {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] p-4">
      <div className="relative w-full max-w-[430px] h-[932px] max-h-[95vh] bg-background rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
        
        {/* Dynamic island / notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50" />
        
        {/* Content */}
        <div className="h-full pt-14 pb-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
