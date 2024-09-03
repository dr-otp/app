export interface User {
  id: string
  username: string
  email: string
  roles: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt: null | Date
  createdBy: null | User
}
