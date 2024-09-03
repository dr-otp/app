import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  await authStore.checkAuthStatus()

  authStore.isAdmin ? next() : next({ name: 'home.index' })
}

export default isAdminGuard
