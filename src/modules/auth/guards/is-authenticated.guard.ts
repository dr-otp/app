import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AuthStatus } from '../interfaces'
import { useAuthStore } from '../store/auth.store'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // If the auth status is checking, wait for it to complete
  if (authStore.authStatus === AuthStatus.Checking) await authStore.checkAuthStatus()

  // If the user is unauthenticated, redirect to login
  authStore.authStatus === AuthStatus.Unauthenticated ? next({ name: 'auth.login' }) : next()
}

export default isAuthenticatedGuard
