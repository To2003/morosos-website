'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface CreateTeamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTeam: (team: { name: string; type: string; icon: string }) => void
}

const ICONS = ['⚽', '🏀', '🏐', '🎾', '🏑', '🏈', '⛳', '🎱', '🍖', '🍕', '🎮', '🎸']

export function CreateTeamModal({ open, onOpenChange, onCreateTeam }: CreateTeamModalProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('⚽')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !type) return

    onCreateTeam({
      name,
      type,
      icon: selectedIcon,
    })

    // Reset form
    setName('')
    setType('')
    setSelectedIcon('⚽')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Crear nuevo equipo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-muted-foreground">
              Nombre del equipo
            </Label>
            <Input
              id="teamName"
              placeholder="Ej: Los Cracks del Barrio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamType" className="text-muted-foreground">
              Tipo de actividad
            </Label>
            <Input
              id="teamType"
              placeholder="Ej: Fútbol 5, Hockey, Asado mensual"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-secondary border-border rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">
              Ícono del equipo
            </Label>
            <div className="grid grid-cols-6 gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all',
                    selectedIcon === icon
                      ? 'bg-emerald-500/20 ring-2 ring-emerald-500'
                      : 'bg-secondary hover:bg-secondary/80'
                  )}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl h-12"
              disabled={!name || !type}
            >
              Crear equipo
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
