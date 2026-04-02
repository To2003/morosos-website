'use client'

import { useState } from 'react'
import { Trophy, Check } from 'lucide-react'
import { teams, players } from '@/lib/data'
import { cn } from '@/lib/utils'

export function MorososScreen() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Get all players with debt > 0
  const debtors = players.filter(p => p.amount > 0)
  
  // Find top debtor
  const topDebtor = debtors.reduce((max, p) => p.amount > max.amount ? p : max, debtors[0])
  
  // Filter by team
  const filteredPlayers = activeFilter === 'all' 
    ? players 
    : players.filter(p => p.teamId === activeFilter)

  // Group by team (only used when filtering by specific team)
  const selectedTeam = teams.find(t => t.id === activeFilter)

  // All players sorted by debt for "Todos" view
  const allPlayersSorted = [...players].sort((a, b) => b.amount - a.amount)

  const filters = [
    { id: 'all', label: 'Todos', icon: null },
    ...teams.map(t => ({ id: t.id, label: t.name, icon: t.icon }))
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-32">
        {/* Header */}
        <div className="pt-4 pb-4">
          <h1 className="text-2xl font-bold text-foreground">Tabla de morosos</h1>
          <p className="text-muted-foreground text-sm">Filtrá por equipo o mirá todos</p>
        </div>

        {/* Filters - Horizontal scrollable */}
        <div className="relative -mx-5 px-5 mb-6">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 snap-x snap-mandatory">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border snap-start shrink-0',
                  activeFilter === filter.id
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card text-foreground border-border hover:border-foreground/50'
                )}
              >
                {filter.icon && <span>{filter.icon}</span>}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top debtor highlight - only in "Todos" */}
        {topDebtor && activeFilter === 'all' && (
          <div className="bg-gradient-to-r from-red-500/20 to-red-500/10 rounded-2xl p-4 border border-red-500/30 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                Mayor deudor global
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center text-sm font-bold text-red-300">
                {topDebtor.initials}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">{topDebtor.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-400">
                    ${topDebtor.amount.toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{topDebtor.teamName}</p>
              </div>
            </div>
          </div>
        )}

        {/* "Todos" View - Flat list with name, team, amount */}
        {activeFilter === 'all' && (
          <div className="space-y-2">
            {allPlayersSorted.map((player, index) => {
              const isPaid = player.amount === 0
              const isTopDebtor = player.id === topDebtor?.id
              
              return (
                <div
                  key={player.id}
                  className={cn(
                    'bg-card rounded-xl p-3 border transition-colors',
                    isTopDebtor ? 'border-red-500/30' : 'border-border/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {!isPaid && (
                        <span className="text-muted-foreground text-sm w-4">
                          {index + 1}
                        </span>
                      )}
                      {isPaid && (
                        <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                      )}
                      <div className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold',
                        isPaid ? 'bg-emerald-500/20 text-emerald-300' :
                        isTopDebtor ? 'bg-red-500/30 text-red-300' :
                        player.amount > 5000 ? 'bg-amber-500/30 text-amber-300' :
                        'bg-secondary text-foreground'
                      )}>
                        {player.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn(
                          'font-medium',
                          isTopDebtor && !isPaid && 'text-foreground'
                        )}>
                          {player.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {player.teamName}
                        </span>
                      </div>
                    </div>
                    <span className={cn(
                      'font-bold',
                      isPaid ? 'text-emerald-400' :
                      isTopDebtor ? 'text-red-400' :
                      'text-amber-400'
                    )}>
                      {isPaid ? 'Al día' : `$${player.amount.toLocaleString('es-AR')}`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Team-specific View - Grouped by team */}
        {activeFilter !== 'all' && selectedTeam && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-3 flex items-center gap-2">
                {selectedTeam.icon} {selectedTeam.name.toUpperCase()}
              </h3>
              
              <div className="space-y-2">
                {filteredPlayers.sort((a, b) => b.amount - a.amount).map((player, index) => {
                  const isTopInTeam = player.amount > 0 && index === 0
                  const isPaid = player.amount === 0
                  
                  return (
                    <div
                      key={player.id}
                      className={cn(
                        'bg-card rounded-xl p-3 border transition-colors',
                        isTopInTeam ? 'border-red-500/30' : 'border-border/50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {!isPaid && (
                            <span className="text-muted-foreground text-sm w-4">
                              {index + 1}
                            </span>
                          )}
                          {isPaid && (
                            <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </div>
                          )}
                          <div className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold',
                            isPaid ? 'bg-emerald-500/20 text-emerald-300' :
                            isTopInTeam ? 'bg-red-500/30 text-red-300' :
                            player.amount > 5000 ? 'bg-amber-500/30 text-amber-300' :
                            'bg-secondary text-foreground'
                          )}>
                            {player.initials}
                          </div>
                          <span className={cn(
                            'font-medium',
                            isTopInTeam && !isPaid && 'text-foreground'
                          )}>
                            {player.name}
                          </span>
                          {isTopInTeam && !isPaid && (
                            <div className="h-1 w-16 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <span className={cn(
                          'font-bold',
                          isPaid ? 'text-emerald-400' :
                          isTopInTeam ? 'text-red-400' :
                          'text-amber-400'
                        )}>
                          {isPaid ? 'Al día' : `$${player.amount.toLocaleString('es-AR')}`}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* If no players have debt in this team */}
            {filteredPlayers.every(p => p.amount === 0) && (
              <div className="bg-card rounded-xl p-4 border border-emerald-500/30 text-center">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-emerald-400 font-medium">Todos al día</p>
                <p className="text-muted-foreground text-sm">No hay deudas pendientes</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
