'use client'

import { useState, useRef } from 'react'
import { Upload, X, Check, Copy, Image as ImageIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teamName: string
  concept: string
  amount: number
  alias?: string
  cbu?: string
  onSubmitPayment: (proofImage: string) => void
}

export function PaymentModal({ 
  open, 
  onOpenChange, 
  teamName,
  concept,
  amount,
  alias,
  cbu,
  onSubmitPayment 
}: PaymentModalProps) {
  const [proofImage, setProofImage] = useState<string | null>(null)
  const [copiedAlias, setCopiedAlias] = useState(false)
  const [copiedCbu, setCopiedCbu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProofImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (proofImage) {
      onSubmitPayment(proofImage)
      setProofImage(null)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setProofImage(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            Pagar deuda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Amount info */}
          <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl p-4 border border-amber-500/30 text-center">
            <p className="text-sm text-amber-200/80 mb-1">{teamName}</p>
            <p className="text-3xl font-bold text-foreground">
              ${amount.toLocaleString('es-AR')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{concept}</p>
          </div>

          {/* Payment info */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider">
              DATOS PARA TRANSFERIR
            </p>
            
            {alias && (
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-secondary rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">Alias</p>
                  <p className="font-mono font-medium text-foreground">{alias}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl border-border shrink-0"
                  onClick={copyAlias}
                >
                  {copiedAlias ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            )}

            {cbu && (
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-secondary rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">CBU/CVU</p>
                  <p className="font-mono text-sm font-medium text-foreground break-all">{cbu}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl border-border shrink-0"
                  onClick={copyCbu}
                >
                  {copiedCbu ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Upload proof */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider">
              SUBIR COMPROBANTE
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {proofImage ? (
              <div className="relative">
                <img 
                  src={proofImage} 
                  alt="Comprobante" 
                  className="w-full h-48 object-cover rounded-xl border border-border"
                />
                <button
                  onClick={() => setProofImage(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-muted-foreground/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Tocá para subir una imagen
                </p>
              </button>
            )}
          </div>

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={!proofImage}
            className={cn(
              "w-full rounded-xl h-12 font-semibold",
              proofImage 
                ? "bg-emerald-500 hover:bg-emerald-400 text-black" 
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Upload className="w-5 h-5 mr-2" />
            Enviar comprobante
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
