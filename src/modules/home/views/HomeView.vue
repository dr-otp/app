<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <div class="w-[100swh] h-[100svh] flex flex-col items-center justify-center space-y-4">
    <h1 className="text-3xl font-bold underline">Welcome! {{ authStore.username }}</h1>
  </div>
</template>
