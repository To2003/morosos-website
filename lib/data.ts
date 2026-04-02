import type { User, Team, Debt, Player, Activity, Stats, PaymentHistory } from './types'

export const currentUser: User = {
  id: '1',
  name: 'Matías García',
  email: 'matias@gmail.com',
  initials: 'MG',
}

// Generate random alphanumeric code (8 characters)
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export const teams: Team[] = [
  {
    id: '1',
    name: 'Los Cracks del Barrio',
    type: 'Fútbol 5',
    icon: '⚽',
    memberCount: 8,
    totalDebt: 47500,
    collected: 23000,
    collectionPercentage: 48,
    dueDate: 'Vence hoy',
    dueStatus: 'urgent',
    inviteCode: 'X7K9M2PL',
    alias: 'loscracks.mp',
    cbu: '0000003100029104829572',
    members: [
      { 
        id: '1', 
        userId: '2', 
        name: 'Juan Rodríguez', 
        initials: 'JR', 
        role: 'jugador', 
        status: 'review', 
        amount: 5000,
        paymentProof: {
          id: 'proof1',
          imageUrl: 'https://placehold.co/400x600/1a1a1a/888888?text=Comprobante',
          uploadedAt: '2024-01-16T10:30:00',
          status: 'pending'
        }
      },
      { id: '2', userId: '3', name: 'Andrés González', initials: 'AG', role: 'jugador', status: 'unpaid', amount: 12500 },
      { id: '3', userId: '4', name: 'Lucas Méndez', initials: 'LM', role: 'parrillero', status: 'paid', amount: 0 },
      { id: '4', userId: '1', name: 'Matías García', initials: 'MG', role: 'admin', status: 'pending', amount: 5000 },
    ],
  },
  {
    id: '2',
    name: 'Las Panteras Hockey',
    type: 'Hockey',
    icon: '🏑',
    memberCount: 12,
    totalDebt: 8000,
    collected: 5200,
    collectionPercentage: 65,
    dueDate: 'en 3 días',
    dueStatus: 'pending',
    inviteCode: 'P4NT3R8S',
    alias: 'panteras.hockey',
    cbu: '0000003100045678912345',
    members: [
      { id: '5', userId: '5', name: 'Mora Figueroa', initials: 'MF', role: 'admin', status: 'unpaid', amount: 8000 },
      { id: '6', userId: '6', name: 'Lucía Pérez', initials: 'LP', role: 'jugador', status: 'paid', amount: 0 },
    ],
  },
  {
    id: '3',
    name: 'Los Choris',
    type: 'Asado mensual',
    icon: '🍖',
    memberCount: 6,
    totalDebt: 0,
    collected: 12000,
    collectionPercentage: 100,
    dueDate: '10 días',
    dueStatus: 'ok',
    inviteCode: 'CH0R1S99',
    alias: 'loschoris.asado',
    cbu: '0000003100098765432100',
    members: [
      { id: '7', userId: '1', name: 'Matías García', initials: 'MG', role: 'admin', status: 'paid', amount: 0 },
      { id: '8', userId: '7', name: 'Pedro Sánchez', initials: 'PS', role: 'jugador', status: 'paid', amount: 0 },
      { id: '9', userId: '8', name: 'Carlos López', initials: 'CL', role: 'parrillero', status: 'paid', amount: 0 },
    ],
  },
]

export const debts: Debt[] = [
  {
    id: '1',
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
    teamIcon: '⚽',
    concept: 'Cancha – Martes',
    amount: 5000,
    dueDate: 'Vence hoy',
    dueInDays: 0,
    status: 'urgent',
    paidCount: 5,
    totalCount: 8,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
    teamIcon: '⚽',
    concept: 'Asado mensual',
    amount: 7500,
    dueDate: 'Vence en 5 días',
    dueInDays: 5,
    status: 'pending',
    paidCount: 2,
    totalCount: 8,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    teamId: '2',
    teamName: 'Las Panteras Hockey',
    teamIcon: '🏑',
    concept: 'Cuota abril',
    amount: 8000,
    dueDate: '3 días',
    dueInDays: 3,
    status: 'pending',
    createdAt: '2024-01-12',
  },
  {
    id: '4',
    teamId: '3',
    teamName: 'Los Choris',
    teamIcon: '🍖',
    concept: 'Asado mensual',
    amount: 0,
    dueDate: '10 días',
    dueInDays: 10,
    status: 'ok',
    createdAt: '2024-01-01',
  },
]

export const players: Player[] = [
  // Los Cracks del Barrio
  {
    id: '1',
    name: 'Juan Rodríguez',
    initials: 'JR',
    status: 'review',
    amount: 5000,
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
    paymentProof: {
      id: 'proof1',
      imageUrl: 'https://placehold.co/400x600/1a1a1a/888888?text=Comprobante',
      uploadedAt: '2024-01-16T10:30:00',
      status: 'pending'
    }
  },
  {
    id: '2',
    name: 'Andrés González',
    initials: 'AG',
    status: 'unpaid',
    amount: 12500,
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
  },
  {
    id: '3',
    name: 'Lucas Méndez',
    initials: 'LM',
    status: 'paid',
    amount: 0,
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
  },
  {
    id: '4',
    name: 'Matías García',
    initials: 'MG',
    status: 'pending',
    amount: 5000,
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
  },
  // Las Panteras Hockey
  {
    id: '5',
    name: 'Mora Figueroa',
    initials: 'MF',
    status: 'unpaid',
    amount: 8000,
    teamId: '2',
    teamName: 'Las Panteras Hockey',
  },
  {
    id: '6',
    name: 'Lucía Pérez',
    initials: 'LP',
    status: 'paid',
    amount: 0,
    teamId: '2',
    teamName: 'Las Panteras Hockey',
  },
]

export const activities: Activity[] = [
  {
    id: '1',
    type: 'success',
    message: 'Tu pago de $5.000 en Los Cracks fue confirmado.',
    time: '2h',
  },
  {
    id: '2',
    type: 'info',
    message: 'Nuevo asado creado en Los Choris.',
    time: '5h',
  },
  {
    id: '3',
    type: 'error',
    message: 'Tu comprobante fue rechazado: Foto borrosa.',
    time: 'Ayer',
  },
]

export const userStats: Stats = {
  punctuality: 73,
  rejections: 1,
  teams: 3,
  successfulPayments: 14,
}

export const userDebts = [
  {
    teamId: '1',
    teamName: 'Los Cracks del Barrio',
    teamIcon: '⚽',
    concept: 'Cancha vence hoy',
    amount: 5000,
  },
  {
    teamId: '2',
    teamName: 'Las Panteras Hockey',
    teamIcon: '🏑',
    concept: 'Cuota abril · 3 días',
    amount: 8000,
  },
  {
    teamId: '3',
    teamName: 'Los Choris',
    teamIcon: '🍖',
    concept: 'Al día',
    amount: 0,
  },
]

export const paymentHistory: PaymentHistory[] = [
  { id: '1', concept: 'Cancha - Martes', amount: 5000, date: '15 Ene 2024', status: 'completed', paidBy: 'Lucas Méndez' },
  { id: '2', concept: 'Cancha - Martes', amount: 5000, date: '14 Ene 2024', status: 'completed', paidBy: 'Juan Rodríguez' },
  { id: '3', concept: 'Asado mensual', amount: 2500, date: '10 Ene 2024', status: 'rejected', paidBy: 'Andrés González', rejectionReason: 'Foto borrosa, no se ve el monto' },
  { id: '4', concept: 'Cancha - Martes', amount: 5000, date: '8 Ene 2024', status: 'completed', paidBy: 'Matías García' },
  { id: '5', concept: 'Cuota diciembre', amount: 8000, date: '1 Dic 2023', status: 'completed', paidBy: 'Mora Figueroa' },
]
