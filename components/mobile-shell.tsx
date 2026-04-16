'use client'

import { ReactNode } from 'react'

interface MobileShellProps {
  children: ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="h-full">
        {children}
      </div>
    </div>
  )
}