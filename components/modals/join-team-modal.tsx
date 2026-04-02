'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface JoinTeamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onJoinTeam: (code: string) => void
}

export function JoinTeamModal({ open, onOpenChange, onJoinTeam }: JoinTeamModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || code.length !== 6) {
      setError('El código debe tener 6 caracteres')
      return
    }

    onJoinTeam(code.toUpperCase())
    setCode('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Unirse a un equipo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="inviteCode" className="text-muted-foreground">
              Código de invitación
            </Label>
            <div className="relative">
              <Input
                id="inviteCode"
                placeholder="CRACK1"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase())
                  setError('')
                }}
                maxLength={6}
                className="bg-secondary border-border rounded-xl h-14 text-center text-xl font-mono tracking-widest uppercase"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Ingresá el código de 6 caracteres que te compartieron
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl h-12"
              disabled={!code}
            >
              Buscar equipo
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
