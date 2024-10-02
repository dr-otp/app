<script setup lang="ts">
import type { CardSlots } from 'primevue/card'

interface Props {
  deleted?: boolean
}

withDefaults(defineProps<Props>(), {
  deleted: false
})
// Define the slots for the Card component
defineSlots<CardSlots>()
</script>

<template>
  <Card
    :class="[
      'dark:bg-dark-950 dark:border-gray-700',
      { 'border border-primary-400': !deleted },
      { 'border-2 border-red-500 dark:border-red-600': deleted }
    ]"
  >
    <!-- Use the slots here -->
    <template #header>
      <slot name="header" />
    </template>
    <template #title>
      <slot name="title" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<style scoped></style>
