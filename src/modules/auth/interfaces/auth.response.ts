import type { User } from '../../users/interfaces/user.interface'

export interface AuthResponse {
  user: User
  token: string
}
