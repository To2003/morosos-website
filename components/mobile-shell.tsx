'use client'

import { ReactNode } from 'react'

interface MobileShellProps {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] p-4">
      <div className="relative w-full max-w-[430px] h-[932px] max-h-[95vh] bg-background rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-3 z-50">
          <span className="text-sm font-medium text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
            </svg>
            <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 22h20V2z"/>
            </svg>
            <div className="w-7 h-3 bg-amber-500 rounded-sm flex items-center justify-end pr-0.5">
              <div className="w-0.5 h-1.5 bg-amber-700 rounded-full mr-[-3px]" />
            </div>
          </div>
        </div>
        
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
