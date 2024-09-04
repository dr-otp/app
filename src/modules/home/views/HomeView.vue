<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/auth.store'
import { useConfigStore } from '@shared/stores/config.store'

const authStore = useAuthStore()
const { toggleTheme } = useConfigStore()
</script>

<template>
  <div class="w-[100swh] h-[100svh] flex flex-col items-center justify-center space-y-4">
    <h1 className="text-3xl font-bold underline">Welcome! {{ authStore.username }}</h1>
    <Button label="Toggle Color Scheme" @click="toggleTheme()" />
    <Button label="Generate OTP" :to="{ name: 'home.generate_otp' }" as="router-link" />
    <Button label="Logout" @click="authStore.logout(true)" />
  </div>
</template>
