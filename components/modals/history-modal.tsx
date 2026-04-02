'use client'

import { Check, X, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { PaymentHistory } from '@/lib/types'

interface HistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teamName: string
  history: PaymentHistory[]
}

export function HistoryModal({ open, onOpenChange, teamName, history }: HistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Historial de {teamName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay pagos registrados aún
            </p>
          ) : (
            history.map((payment) => (
              <div
                key={payment.id}
                className="bg-secondary rounded-xl p-4 flex items-center gap-3"
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  payment.status === 'completed' ? 'bg-emerald-500/20' :
                  payment.status === 'rejected' ? 'bg-red-500/20' :
                  'bg-amber-500/20'
                )}>
                  {payment.status === 'completed' ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : payment.status === 'rejected' ? (
                    <X className="w-5 h-5 text-red-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{payment.concept}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.paidBy} · {payment.date}
                  </p>
                </div>
                <span className={cn(
                  'font-bold',
                  payment.status === 'completed' ? 'text-emerald-400' :
                  payment.status === 'rejected' ? 'text-red-400' :
                  'text-amber-400'
                )}>
                  ${payment.amount.toLocaleString('es-AR')}
                </span>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
