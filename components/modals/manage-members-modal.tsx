'use client'

import { useState } from 'react'
import { ChevronDown, Check, Copy } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { TeamMember, Team } from '@/lib/types'

interface ManageMembersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  team: Team
  onUpdateTeam: (updates: { alias?: string; cbu?: string }) => void
  onUpdateMemberRole: (memberId: string, role: TeamMember['role']) => void
}

const ROLES: { value: TeamMember['role']; label: string; canCreateDebt: boolean }[] = [
  { value: 'admin', label: 'Admin', canCreateDebt: true },
  { value: 'parrillero', label: 'Parrillero', canCreateDebt: true },
  { value: 'jugador', label: 'Jugador', canCreateDebt: false },
]

export function ManageMembersModal({ 
  open, 
  onOpenChange, 
  team,
  onUpdateTeam,
  onUpdateMemberRole 
}: ManageMembersModalProps) {
  const [alias, setAlias] = useState(team.alias || '')
  const [cbu, setCbu] = useState(team.cbu || '')
  const [copiedAlias, setCopiedAlias] = useState(false)
  const [copiedCbu, setCopiedCbu] = useState(false)

  const copyAlias = async () => {
    if (alias) {
      await navigator.clipboard.writeText(alias)
      setCopiedAlias(true)
      setTimeout(() => setCopiedAlias(false), 2000)
    }
  }

  const copyCbu = async () => {
    if (cbu) {
      await navigator.clipboard.writeText(cbu)
      setCopiedCbu(true)
      setTimeout(() => setCopiedCbu(false), 2000)
    }
  }

  const handleSave = () => {
    onUpdateTeam({ alias, cbu })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md mx-auto max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Configuración de {team.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Payment info section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider">
              DATOS DE PAGO (POZO COMÚN)
            </h3>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Alias de Mercado Pago</Label>
              <div className="flex gap-2">
                <Input
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="ej: miequipo.mp"
                  className="flex-1 bg-secondary border-border rounded-xl h-11"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-border shrink-0"
                  onClick={copyAlias}
                  disabled={!alias}
                >
                  {copiedAlias ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">CBU/CVU</Label>
              <div className="flex gap-2">
                <Input
                  value={cbu}
                  onChange={(e) => setCbu(e.target.value)}
                  placeholder="0000003100..."
                  className="flex-1 bg-secondary border-border rounded-xl h-11 font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-border shrink-0"
                  onClick={copyCbu}
                  disabled={!cbu}
                >
                  {copiedCbu ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Members section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider">
              MIEMBROS Y ROLES
            </h3>

            <div className="space-y-2">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="bg-secondary rounded-xl p-3 flex items-center gap-3"
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                    member.role === 'admin' ? 'bg-amber-500/20 text-amber-300' :
                    member.role === 'parrillero' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-muted text-muted-foreground'
                  )}>
                    {member.initials}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{member.name}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                          'h-9 text-sm border-border gap-1 shrink-0',
                          member.role === 'admin' ? 'text-amber-400' :
                          member.role === 'parrillero' ? 'text-orange-400' :
                          'text-muted-foreground'
                        )}
                      >
                        {ROLES.find(r => r.value === member.role)?.label}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      {ROLES.map((role) => (
                        <DropdownMenuItem
                          key={role.value}
                          onClick={() => onUpdateMemberRole(member.id, role.value)}
                          className={cn(
                            'cursor-pointer',
                            member.role === role.value && 'bg-secondary'
                          )}
                        >
                          <div>
                            <span className={cn(
                              role.value === 'admin' ? 'text-amber-400' :
                              role.value === 'parrillero' ? 'text-orange-400' :
                              'text-foreground'
                            )}>
                              {role.label}
                            </span>
                            {role.canCreateDebt && (
                              <p className="text-xs text-muted-foreground">
                                Puede crear deudas
                              </p>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex gap-2">
          <Button
            variant="ghost"
            className="flex-1 rounded-xl h-12"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 rounded-xl h-12 bg-emerald-500 hover:bg-emerald-400 text-black"
            onClick={handleSave}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
