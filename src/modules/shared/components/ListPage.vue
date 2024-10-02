<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import CustomButton from './CustomButton.vue'
import { useConfigStore } from '../stores/config.store'
import { storeToRefs } from 'pinia'

interface Props {
  blockBody: boolean
  title: string
  label: string
  btnDisabled: boolean
}

withDefaults(defineProps<Props>(), {
  blockBody: false
})
defineEmits(['on:click'])

const configStore = useConfigStore()
const { isMobile } = storeToRefs(configStore)
</script>

<template>
  <section class="mb-4 border-b-2 border-b-gray-300 dark:border-b-gray-700 py-4">
    <div class="flex justify-between">
      <h1 class="text-4xl font-semibold">{{ title }}</h1>
      <CustomButton
        :label="isMobile ? '' : label"
        @click="$emit('on:click')"
        :icon="icons.PLUS"
        icon-pos="right"
        :disabled="btnDisabled"
      />
    </div>
  </section>
  <BlockUI :blocked="blockBody">
    <section class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <slot name="body" />
    </section>
    <section class="py-8">
      <slot name="footer" />
    </section>
  </BlockUI>
</template>

<style scoped></style>
