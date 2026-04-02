'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateDebtModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teamName: string
  onCreateDebt: (debt: { concept: string; amount: number; dueDate: string }) => void
}

export function CreateDebtModal({ open, onOpenChange, teamName, onCreateDebt }: CreateDebtModalProps) {
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!concept || !amount || !dueDate) return

    onCreateDebt({
      concept,
      amount: parseFloat(amount),
      dueDate,
    })

    // Reset form
    setConcept('')
    setAmount('')
    setDueDate('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Nueva deuda en {teamName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="concept" className="text-muted-foreground">
              Concepto
            </Label>
            <Input
              id="concept"
              placeholder="Ej: Cancha - Martes"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="bg-secondary border-border rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-muted-foreground">
              Monto por persona
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="5.000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary border-border rounded-xl h-12 pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-muted-foreground">
              Fecha de vencimiento
            </Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-secondary border-border rounded-xl h-12"
              />
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl h-12"
              disabled={!concept || !amount || !dueDate}
            >
              Crear deuda
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full rounded-xl h-12"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
