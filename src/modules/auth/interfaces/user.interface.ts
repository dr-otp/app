export interface User {
  id: string
  username: string
  email: string
  roles: UserRoles[]
  createdAt: Date
  updatedAt: Date
  deletedAt: null | Date
  creator: null | UserSummary
}

export enum UserRoles {
  Admin = 'Admin',
  User = 'User',
  Moderator = 'Moderator'
}

export interface UserSummary {
  id: string
  username: string
  email: string
}
