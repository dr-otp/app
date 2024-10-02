<script setup lang="ts">
interface Props {
  blockBody: boolean
}

withDefaults(defineProps<Props>(), {
  blockBody: false
})
</script>

<template>
  <section class="mb-4 border-b-2 border-b-gray-300 dark:border-b-gray-700 py-4">
    <slot name="header" />
  </section>
  <BlockUI :blocked="blockBody">
    <section class="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <slot name="body" />
    </section>
    <section class="py-8">
      <slot name="footer" />
    </section>
  </BlockUI>
</template>

<style scoped></style>
