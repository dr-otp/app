<script setup lang="ts">
import type { CardSlots } from 'primevue/card'

// Define the slots for the Card component
defineSlots<CardSlots>()
</script>

<template>
  <Card class="dark:bg-gray-900 border dark:border-gray-700">
    <!-- Use the slots here -->
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>

<style scoped></style>
