import type { UserSummary } from '@/modules/users/interfaces'

export interface Product {
  id: string
  code: number
  name: string
  price: number | string
  createdAt: Date | string
  updatedAt: Date | string | null
  deletedAt?: Date | string | null
  createdBy?: UserSummary | null
  updatedBy?: UserSummary | null
  deletedBy?: UserSummary | null
}
