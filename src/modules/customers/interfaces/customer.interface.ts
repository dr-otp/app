import type { UserSummary } from '@/modules/users/interfaces'

export interface Customer {
  id: string
  code: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  createdBy: UserSummary | null
  updatedBy: UserSummary | null
  deletedBy: UserSummary | null
}

export interface DeleteRestoreCustomer {
  customerId: string
  isDeleted: boolean
}
