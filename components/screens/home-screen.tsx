'use client'

import { useState } from 'react'
import { Plus, Link } from 'lucide-react'
import { currentUser, teams, generateInviteCode } from '@/lib/data'
import { cn } from '@/lib/utils'
import { CreateTeamModal } from '@/components/modals/create-team-modal'
import { JoinTeamModal } from '@/components/modals/join-team-modal'

interface HomeScreenProps {
  onNavigateToTeam?: (teamId: string) => void
}

export function HomeScreen({ onNavigateToTeam }: HomeScreenProps) {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false)
  
  const activeTeams = teams.length

  const handleCreateTeam = (team: { name: string; type: string; icon: string }) => {
    console.log('[v0] Creating team:', team, 'with invite code:', generateInviteCode())
    // In a real app, this would call an API
  }

  const handleJoinTeam = (code: string) => {
    console.log('[v0] Joining team with code:', code)
    // In a real app, this would call an API to validate the code
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-32">
        {/* Header */}
        <div className="pt-4 pb-6">
          <p className="text-muted-foreground text-sm">Hola de nuevo</p>
          <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">{activeTeams} equipos activos</p>
        </div>

        {/* Teams list */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">
            MIS EQUIPOS
          </h2>
          
          <div className="space-y-3">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => onNavigateToTeam?.(team.id)}
                className="w-full bg-card rounded-2xl p-4 border border-border/50 hover:border-border transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-xl',
                    team.dueStatus === 'urgent' ? 'bg-red-500/20' :
                    team.dueStatus === 'pending' ? 'bg-amber-500/20' :
                    'bg-emerald-500/20'
                  )}>
                    {team.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {team.type} · {team.memberCount} jugador{team.memberCount !== 1 ? 'es' : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {team.totalDebt > 0 && (
                        <span className={cn(
                          'text-xs font-medium px-2 py-1 rounded-full',
                          team.dueStatus === 'urgent' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        )}>
                          ${team.totalDebt.toLocaleString('es-AR')} {team.dueDate}
                        </span>
                      )}
                      <span className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        team.collectionPercentage === 100 
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-secondary text-muted-foreground'
                      )}>
                        {team.collectionPercentage === 100 ? '100% cobrado' : `${team.collectionPercentage}% cobrado`}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => setShowCreateTeamModal(true)}
            className="w-full bg-card rounded-2xl p-4 border border-dashed border-border hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Crear nuevo equipo</span>
          </button>
          
          <button 
            onClick={() => setShowJoinTeamModal(true)}
            className="w-full bg-card rounded-2xl p-4 border border-dashed border-border hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
          >
            <Link className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Unirme con código</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateTeamModal
        open={showCreateTeamModal}
        onOpenChange={setShowCreateTeamModal}
        onCreateTeam={handleCreateTeam}
      />
      
      <JoinTeamModal
        open={showJoinTeamModal}
        onOpenChange={setShowJoinTeamModal}
        onJoinTeam={handleJoinTeam}
      />
    </div>
  )
}
