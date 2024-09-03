import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { checkAuthAction, loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))
  const sessionClosed = ref(false)

  const login = async (username: string, password: string) => {
    try {
      const loginResp = await loginAction(username, password)

      if (!loginResp.ok) {
        logout()
        return false
      }

      user.value = loginResp.user
      token.value = loginResp.token
      authStatus.value = AuthStatus.Authenticated

      return true
    } catch (error) {
      return logout()
    }
  }

  const logout = (closedManually = false): boolean => {
    localStorage.removeItem('token')

    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = ''

    if (closedManually) sessionClosed.value = true

    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction()

      if (!statusResp.ok) {
        logout()
        return false
      }

      authStatus.value = AuthStatus.Authenticated
      user.value = statusResp.user
      token.value = statusResp.token
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return {
    user,
    token,
    authStatus,
    sessionClosed,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.username),

    // Actions
    login,
    logout,
    checkAuthStatus
  }
})
