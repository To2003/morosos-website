'use client'

import { Home, AlertTriangle, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabId = 'inicio' | 'morosos' | 'perfil'

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs = [
  { id: 'inicio' as TabId, label: 'Inicio', icon: Home },
  { id: 'morosos' as TabId, label: 'Morosos', icon: AlertTriangle },
  { id: 'perfil' as TabId, label: 'Perfil', icon: User },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-8 pt-2 px-4 z-40">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200',
                isActive 
                  ? 'bg-secondary text-amber-500' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
