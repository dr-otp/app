import type { UserRoles } from '@/modules/auth/interfaces'

export const hasRole = (userRoles: UserRoles[], roles: UserRoles[] | UserRoles): boolean => {
  if (!userRoles) return true

  return Array.isArray(roles) // Check if roles is an array
    ? userRoles.some((role) => roles.includes(role)) // Check if userRoles has some role in roles
    : userRoles.includes(roles) // Check if userRoles has the role
}
