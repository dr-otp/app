<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useConfigStore } from '@shared/stores/config.store'
import { useAuthStore } from './modules/auth/store/auth.store'
import { AuthStatus } from './modules/auth/interfaces'
import { useRoute, useRouter } from 'vue-router'
import FullscreenLoader from '@shared/components/FullscreenLoader.vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { setAppTheme } = useConfigStore()

setAppTheme()

authStore.$subscribe(
  async (_, state) => {
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home.index' })
      return
    }

    if (authStore.authStatus === AuthStatus.Unauthenticated) {
      router.replace({ name: 'auth.login' })
    }

    if (authStore.sessionClosed)
      toast.add({
        severity: 'error',
        summary: 'No Autorizado',
        detail: 'La sesión ha expirado, por favor inicie sesión nuevamente',
        life: 5000
      })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <FullscreenLoader v-if="authStore.isChecking" />

  <RouterView v-else />
  <VueQueryDevtools />
  <Toast />
</template>

<style scoped></style>
