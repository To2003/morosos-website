'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Link, Share2, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { generateInviteCode } from '@/lib/data'

interface InviteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teamName: string
  inviteCode: string
}

export function InviteModal({ open, onOpenChange, teamName, inviteCode: initialCode }: InviteModalProps) {
  const [inviteCode, setInviteCode] = useState(initialCode)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const inviteLink = `https://equipopago.app/join/${inviteCode}`

  useEffect(() => {
    setInviteCode(initialCode)
  }, [initialCode])

  const regenerateCode = () => {
    const newCode = generateInviteCode()
    setInviteCode(newCode)
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(inviteCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Únete a ${teamName}`,
        text: `Te invito a unirte a ${teamName} en EquipoPago`,
        url: inviteLink,
      })
    } else {
      copyLink()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            Invitar a {teamName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Invite Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground tracking-wider">
                CÓDIGO DE INVITACIÓN
              </label>
              <button
                onClick={regenerateCode}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerar
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-secondary rounded-xl p-4 text-center">
                <span className="text-2xl font-mono font-bold tracking-widest text-foreground">
                  {inviteCode}
                </span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-xl border-border"
                onClick={copyCode}
              >
                {copiedCode ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Invite Link */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground tracking-wider">
              LINK DE INVITACIÓN
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-secondary rounded-xl p-3 overflow-hidden">
                <p className="text-sm text-muted-foreground truncate">
                  {inviteLink}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl border-border"
                onClick={copyLink}
              >
                {copiedLink ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Link className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Share button */}
          <Button
            onClick={share}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl h-12"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartir invitación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
