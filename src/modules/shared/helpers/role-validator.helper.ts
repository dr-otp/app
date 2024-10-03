import type { UserRoles } from '@/modules/auth/interfaces'

/**
 * Determines if a user has at least one of the specified roles.
 *
 * @param {UserRoles[]} userRoles - The roles assigned to the user.
 * @param {UserRoles[] | UserRoles} roles - The required roles to check, can be a single role or an array of roles.
 * @returns {boolean} - Returns `true` if the user has at least one of the specified roles, otherwise `false`.
 */
export const hasRole = (userRoles: UserRoles[], roles: UserRoles[] | UserRoles): boolean => {
  if (!userRoles) return true

  return Array.isArray(roles) // Check if roles is an array
    ? userRoles.some((role) => roles.includes(role)) // Check if userRoles has some role in roles
    : userRoles.includes(roles) // Check if userRoles has the role
}
