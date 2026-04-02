'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { currentUser, userStats, userDebts, teams } from '@/lib/data'
import { cn } from '@/lib/utils'
import { PaymentModal } from '@/components/modals/payment-modal'

interface ProfileScreenProps {
  onLogout: () => void
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<typeof userDebts[0] | null>(null)

  const totalDebt = userDebts.reduce((sum, d) => sum + d.amount, 0)
  const teamsWithDebt = userDebts.filter(d => d.amount > 0).length

  const handlePayClick = (debt: typeof userDebts[0]) => {
    setSelectedDebt(debt)
    setShowPaymentModal(true)
  }

  const handleSubmitPayment = (proofImage: string) => {
    console.log('Payment submitted:', selectedDebt?.teamName, proofImage.substring(0, 50) + '...')
    setShowPaymentModal(false)
    setSelectedDebt(null)
  }

  // Get team payment info
  const getTeamPaymentInfo = (teamId: string) => {
    const team = teams.find(t => t.id === teamId)
    return {
      alias: team?.alias,
      cbu: team?.cbu
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-32">
        {/* Profile header */}
        <div className="pt-6 pb-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-xl font-bold text-emerald-300">
            {currentUser.initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-muted-foreground text-sm">{currentUser.email}</p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-2xl p-4 border border-red-500/30">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
              Deuda Total
            </p>
            <p className="text-2xl font-bold text-foreground">
              ${totalDebt.toLocaleString('es-AR')}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              en {teamsWithDebt} equipo{teamsWithDebt !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-2xl p-4 border border-emerald-500/30">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Pagado Hoy
            </p>
            <p className="text-2xl font-bold text-foreground">$24.000</p>
            <p className="text-xs text-muted-foreground mt-1">histórico</p>
          </div>
        </div>

        {/* Debt by team */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">
            DEUDA POR EQUIPO
          </h2>
          
          <div className="space-y-3">
            {userDebts.map((debt) => (
              <div
                key={debt.teamId}
                className="bg-card rounded-2xl p-4 border border-border/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-lg',
                      debt.amount > 0 ? 'bg-red-500/20' : 'bg-emerald-500/20'
                    )}>
                      {debt.teamIcon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{debt.teamName}</h3>
                      <p className={cn(
                        'text-sm',
                        debt.amount > 0 ? 'text-red-400' : 'text-emerald-400'
                      )}>
                        {debt.concept}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'font-bold',
                      debt.amount > 0 ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      ${debt.amount.toLocaleString('es-AR')}
                    </span>
                    {debt.amount > 0 && (
                      <button 
                        onClick={() => handlePayClick(debt)}
                        className="bg-amber-500 text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-amber-400 transition-colors"
                      >
                        Pagar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">
            ESTADÍSTICAS
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Puntualidad
              </p>
              <p className="text-2xl font-bold text-amber-400">{userStats.punctuality}%</p>
            </div>
            
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Rechazos
              </p>
              <p className="text-2xl font-bold text-red-400">{userStats.rejections}</p>
            </div>
            
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Equipos
              </p>
              <p className="text-2xl font-bold text-foreground">{userStats.teams}</p>
            </div>
            
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Pagos OK
              </p>
              <p className="text-2xl font-bold text-emerald-400">{userStats.successfulPayments}</p>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button 
          onClick={onLogout}
          className="w-full bg-card rounded-2xl p-4 border border-border/50 hover:border-red-500/50 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>

      {/* Payment modal */}
      {selectedDebt && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={(open) => {
            setShowPaymentModal(open)
            if (!open) setSelectedDebt(null)
          }}
          teamName={selectedDebt.teamName}
          concept={selectedDebt.concept}
          amount={selectedDebt.amount}
          alias={getTeamPaymentInfo(selectedDebt.teamId).alias}
          cbu={getTeamPaymentInfo(selectedDebt.teamId).cbu}
          onSubmitPayment={handleSubmitPayment}
        />
      )}
    </div>
  )
}
