'use client'

import { useState } from 'react'
import { Check, X, ZoomIn } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { TeamMember } from '@/lib/types'

interface ReviewProofModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: TeamMember | null
  onApprove: (memberId: string) => void
  onReject: (memberId: string, reason: string) => void
}

export function ReviewProofModal({ 
  open, 
  onOpenChange, 
  member,
  onApprove,
  onReject 
}: ReviewProofModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  if (!member || !member.paymentProof) return null

  const handleApprove = () => {
    onApprove(member.id)
    onOpenChange(false)
  }

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(member.id, rejectionReason.trim())
      setRejectionReason('')
      setShowRejectForm(false)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setRejectionReason('')
    setShowRejectForm(false)
    onOpenChange(false)
  }

  const uploadDate = new Date(member.paymentProof.uploadedAt)
  const formattedDate = uploadDate.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-card border-border max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Revisar comprobante
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Member info */}
            <div className="flex items-center gap-3 bg-secondary rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-300">
                {member.initials}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{member.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${member.amount.toLocaleString('es-AR')} · {formattedDate}
                </p>
              </div>
            </div>

            {/* Proof image */}
            <div className="relative">
              <img 
                src={member.paymentProof.imageUrl} 
                alt="Comprobante de pago" 
                className="w-full h-64 object-cover rounded-xl border border-border"
              />
              <button
                onClick={() => setShowFullImage(true)}
                className="absolute top-2 right-2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
            </div>

            {showRejectForm ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Motivo del rechazo
                </p>
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Ej: Foto borrosa, no se ve el monto..."
                  className="bg-secondary border-border rounded-xl min-h-[100px]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectForm(false)}
                    className="flex-1 rounded-xl h-11 border-border"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={!rejectionReason.trim()}
                    className="flex-1 rounded-xl h-11 bg-red-500 hover:bg-red-400 text-white"
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowRejectForm(true)}
                  variant="outline"
                  className="flex-1 rounded-xl h-12 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <X className="w-5 h-5 mr-2" />
                  Rechazar
                </Button>
                <Button
                  onClick={handleApprove}
                  className="flex-1 rounded-xl h-12 bg-emerald-500 hover:bg-emerald-400 text-black"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Aprobar
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full image modal */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="bg-black border-none max-w-[95vw] max-h-[95vh] p-2">
          <img 
            src={member.paymentProof.imageUrl} 
            alt="Comprobante de pago" 
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
