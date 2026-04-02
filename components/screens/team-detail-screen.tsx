'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, History, Copy, Check, UserPlus, Settings } from 'lucide-react'
import { teams, debts, paymentHistory, currentUser } from '@/lib/data'
import { cn } from '@/lib/utils'
import { InviteModal } from '@/components/modals/invite-modal'
import { CreateDebtModal } from '@/components/modals/create-debt-modal'
import { HistoryModal } from '@/components/modals/history-modal'
import { ManageMembersModal } from '@/components/modals/manage-members-modal'
import { PaymentModal } from '@/components/modals/payment-modal'
import { ReviewProofModal } from '@/components/modals/review-proof-modal'
import type { TeamMember, Team } from '@/lib/types'

interface TeamDetailScreenProps {
  teamId: string
  onBack: () => void
}

export function TeamDetailScreen({ teamId, onBack }: TeamDetailScreenProps) {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showCreateDebtModal, setShowCreateDebtModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showManageMembersModal, setShowManageMembersModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [reviewingMember, setReviewingMember] = useState<TeamMember | null>(null)
  const [copiedAlias, setCopiedAlias] = useState(false)
  const [copiedCbu, setCopiedCbu] = useState(false)
  
  const team = teams.find(t => t.id === teamId)
  const teamDebts = debts.filter(d => d.teamId === teamId && d.amount > 0)
  const teamHistory = paymentHistory.filter(h => 
    team?.members.some(m => m.name === h.paidBy)
  )

  if (!team) return null

  // Find current user's member record in this team
  const currentMember = team.members.find(m => m.userId === currentUser.id)
  const isAdmin = currentMember?.role === 'admin'
  const canCreateDebt = currentMember?.role === 'admin' || currentMember?.role === 'parrillero'
  const myDebt = currentMember?.amount || 0

  const collectionPercentage = Math.round((team.collected / (team.totalDebt + team.collected)) * 100) || 0

  const copyAlias = async () => {
    if (team.alias) {
      await navigator.clipboard.writeText(team.alias)
      setCopiedAlias(true)
      setTimeout(() => setCopiedAlias(false), 2000)
    }
  }

  const copyCbu = async () => {
    if (team.cbu) {
      await navigator.clipboard.writeText(team.cbu)
      setCopiedCbu(true)
      setTimeout(() => setCopiedCbu(false), 2000)
    }
  }

  const handleCreateDebt = (debt: { concept: string; amount: number; dueDate: string }) => {
    console.log('Creating debt:', debt)
  }

  const handleUpdateTeam = (updates: { alias?: string; cbu?: string }) => {
    console.log('Updating team:', updates)
  }

  const handleUpdateMemberRole = (memberId: string, role: TeamMember['role']) => {
    console.log('Updating member role:', memberId, role)
  }

  const handleSubmitPayment = (proofImage: string) => {
    console.log('Payment submitted with proof:', proofImage.substring(0, 50) + '...')
  }

  const handleApprovePayment = (memberId: string) => {
    console.log('Approved payment for:', memberId)
  }

  const handleRejectPayment = (memberId: string, reason: string) => {
    console.log('Rejected payment for:', memberId, 'Reason:', reason)
  }

  // Find members with pending review
  const membersInReview = team.members.filter(m => m.status === 'review' && m.paymentProof)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1">{team.name}</h1>
        {isAdmin && (
          <button 
            onClick={() => setShowManageMembersModal(true)}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-32">
        {/* Summary card */}
        <div className="bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-2xl p-5 border border-amber-500/40 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-amber-200/80 uppercase tracking-wider mb-1">
                Deuda del equipo
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${team.totalDebt.toLocaleString('es-AR')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wider mb-1">
                Cobrado
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${team.collected.toLocaleString('es-AR')}
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-2">
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500" 
                style={{ width: `${collectionPercentage}%` }} 
              />
            </div>
          </div>
          <p className="text-xs text-amber-200/60">
            {collectionPercentage}% cobrado · {team.memberCount} jugadores
          </p>
        </div>

        {/* Payment info - Copy buttons */}
        {(team.alias || team.cbu) && (
          <div className="flex gap-2 mb-4">
            {team.alias && (
              <button
                onClick={copyAlias}
                className="flex-1 bg-card rounded-xl py-3 px-4 border border-border/50 hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
              >
                {copiedAlias ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium truncate">{team.alias}</span>
              </button>
            )}
            {team.cbu && (
              <button
                onClick={copyCbu}
                className="bg-card rounded-xl py-3 px-4 border border-border/50 hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
              >
                {copiedCbu ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">CBU</span>
              </button>
            )}
          </div>
        )}

        {/* My debt - Pay button */}
        {myDebt > 0 && (
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl p-4 border border-red-500/30 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
                  Tu deuda
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${myDebt.toLocaleString('es-AR')}
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Pagar
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mb-6">
          {canCreateDebt && (
            <button 
              onClick={() => setShowCreateDebtModal(true)}
              className="flex-1 bg-card rounded-xl py-3 px-4 border border-border/50 hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Crear deuda</span>
            </button>
          )}
          <button 
            onClick={() => setShowHistoryModal(true)}
            className="flex-1 bg-card rounded-xl py-3 px-4 border border-border/50 hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
          >
            <History className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Historial</span>
          </button>
        </div>

        {/* Pending reviews - Admin only */}
        {isAdmin && membersInReview.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-blue-400 tracking-wider mb-4">
              COMPROBANTES PENDIENTES ({membersInReview.length})
            </h2>
            
            <div className="space-y-2">
              {membersInReview.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setReviewingMember(member)}
                  className="w-full bg-blue-500/10 rounded-xl p-3 border border-blue-500/30 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-300">
                        {member.initials}
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-foreground">{member.name}</h3>
                        <p className="text-xs text-blue-400">Revisar comprobante</p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">
                      ${member.amount.toLocaleString('es-AR')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active debts */}
        {teamDebts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">
              DEUDAS ACTIVAS
            </h2>
            
            <div className="space-y-3">
              {teamDebts.map((debt) => (
                <div
                  key={debt.id}
                  className="bg-card rounded-2xl p-4 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-lg',
                        debt.status === 'urgent' ? 'bg-red-500/20' : 'bg-amber-500/20'
                      )}>
                        {debt.teamIcon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{debt.concept}</h3>
                        <p className={cn(
                          'text-sm',
                          debt.status === 'urgent' ? 'text-red-400' : 'text-amber-400'
                        )}>
                          {debt.dueDate} · {debt.paidCount || 0} pendientes
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      ${debt.amount.toLocaleString('es-AR')}
                    </span>
                  </div>
                  
                  {/* Mini progress */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${((debt.paidCount || 0) / (debt.totalCount || 1)) * 100}%` }} 
                      />
                    </div>
                    <span>{debt.paidCount || 0} de {debt.totalCount || 0} pagaron</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Players list */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-muted-foreground tracking-wider">
              JUGADORES
            </h2>
            <span className="text-xs font-medium text-amber-400 px-2 py-1 bg-amber-500/20 rounded-full">
              {team.members.length} activos
            </span>
          </div>
          
          <div className="space-y-2">
            {team.members.map((member) => (
              <div
                key={member.id}
                className={cn(
                  "bg-card rounded-xl p-3 border border-border/50",
                  member.status === 'review' && isAdmin && "cursor-pointer hover:border-blue-500/50"
                )}
                onClick={() => {
                  if (member.status === 'review' && isAdmin && member.paymentProof) {
                    setReviewingMember(member)
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                      member.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' :
                      member.status === 'review' ? 'bg-blue-500/20 text-blue-300' :
                      member.status === 'unpaid' ? 'bg-red-500/20 text-red-300' :
                      'bg-amber-500/20 text-amber-300'
                    )}>
                      {member.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {member.name}
                        </h3>
                        {member.role !== 'jugador' && (
                          <span className={cn(
                            'text-xs px-1.5 py-0.5 rounded',
                            member.role === 'admin' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-orange-500/20 text-orange-400'
                          )}>
                            {member.role === 'admin' ? 'Admin' : 'Parrillero'}
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        'text-xs',
                        member.status === 'paid' ? 'text-emerald-400' :
                        member.status === 'review' ? 'text-blue-400' :
                        member.status === 'unpaid' ? 'text-red-400' :
                        'text-amber-400'
                      )}>
                        {member.status === 'paid' ? 'Al día' :
                         member.status === 'review' ? 'En revisión' :
                         member.status === 'unpaid' ? 'Sin pagar' :
                         'Pendiente'}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    'font-bold',
                    member.amount === 0 ? 'text-emerald-400' : 'text-amber-400'
                  )}>
                    ${member.amount.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite button */}
        <button 
          onClick={() => setShowInviteModal(true)}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Invitar jugador
        </button>
      </div>

      {/* Modals */}
      <InviteModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
        teamName={team.name}
        inviteCode={team.inviteCode}
      />
      
      {canCreateDebt && (
        <CreateDebtModal
          open={showCreateDebtModal}
          onOpenChange={setShowCreateDebtModal}
          teamName={team.name}
          onCreateDebt={handleCreateDebt}
        />
      )}
      
      <HistoryModal
        open={showHistoryModal}
        onOpenChange={setShowHistoryModal}
        teamName={team.name}
        history={teamHistory}
      />
      
      {isAdmin && (
        <ManageMembersModal
          open={showManageMembersModal}
          onOpenChange={setShowManageMembersModal}
          team={team}
          onUpdateTeam={handleUpdateTeam}
          onUpdateMemberRole={handleUpdateMemberRole}
        />
      )}

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        teamName={team.name}
        concept={teamDebts[0]?.concept || 'Deuda pendiente'}
        amount={myDebt}
        alias={team.alias}
        cbu={team.cbu}
        onSubmitPayment={handleSubmitPayment}
      />

      <ReviewProofModal
        open={!!reviewingMember}
        onOpenChange={(open) => !open && setReviewingMember(null)}
        member={reviewingMember}
        onApprove={handleApprovePayment}
        onReject={handleRejectPayment}
      />
    </div>
  )
}
