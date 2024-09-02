<script setup lang="ts">
import { useConfigStore } from '@shared/stores/config.store'

const { setAppTheme } = useConfigStore()

setAppTheme()
</script>

<template>
  <router-view />
</template>

<style scoped></style>
