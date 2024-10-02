import type { UserSummary } from '@/modules/auth/interfaces'

export interface Customer {
  id: string
  code: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  createdBy: UserSummary
  updatedBy: UserSummary | null
  deletedBy: UserSummary | null
}
