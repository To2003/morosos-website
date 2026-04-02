export interface User {
  id: string
  name: string
  email: string
  initials: string
  avatar?: string
}

export interface TeamMember {
  id: string
  userId: string
  name: string
  initials: string
  role: 'admin' | 'parrillero' | 'jugador'
  status: 'paid' | 'pending' | 'review' | 'unpaid'
  amount: number
  paymentProof?: PaymentProof
}

export interface PaymentProof {
  id: string
  imageUrl: string
  uploadedAt: string
  status: 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
}

export interface Team {
  id: string
  name: string
  type: string
  icon: string
  memberCount: number
  totalDebt: number
  collected: number
  collectionPercentage: number
  dueDate?: string
  dueStatus?: 'urgent' | 'pending' | 'ok'
  inviteCode: string
  alias?: string // Alias de Mercado Pago para el pozo comun
  cbu?: string // CBU/CVU para transferencias
  members: TeamMember[]
}

export interface Debt {
  id: string
  teamId: string
  teamName: string
  teamIcon: string
  concept: string
  amount: number
  dueDate: string
  dueInDays: number
  status: 'urgent' | 'pending' | 'ok'
  paidCount?: number
  totalCount?: number
  createdAt?: string
}

export interface Player {
  id: string
  name: string
  initials: string
  status: 'paid' | 'pending' | 'review' | 'unpaid'
  amount: number
  teamId: string
  teamName?: string
  paymentProof?: PaymentProof
}

export interface Activity {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  time: string
}

export interface Stats {
  punctuality: number
  rejections: number
  teams: number
  successfulPayments: number
}

export interface PaymentHistory {
  id: string
  concept: string
  amount: number
  date: string
  status: 'completed' | 'rejected' | 'pending'
  paidBy?: string
  rejectionReason?: string
  proofImageUrl?: string
}
