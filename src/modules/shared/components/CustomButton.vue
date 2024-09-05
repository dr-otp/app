<script setup lang="ts">
import type { ButtonProps } from 'primevue/button'

interface Props {
  className?: string
  label?: string
  severity?: ButtonProps['severity']
  outlined?: boolean
  fluid?: boolean
  icon?: string
  iconPos?: 'left' | 'right' | 'top' | 'bottom'
  iconClass?: string
  text?: boolean
  plain?: boolean
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  type?: ButtonProps['type']
}

withDefaults(defineProps<Props>(), {
  label: 'Button',
  className: '',
  severity: 'primary',
  outlined: false,
  fluid: false,
  type: 'button'
})
</script>

<template>
  <Button
    outlined
    :label="label"
    :severity="severity"
    :fluid="fluid"
    :icon="icon"
    :iconPos="iconPos"
    :text="text"
    :plain="plain"
    :disabled="disabled"
    :loading="loading"
    :loadingIcon="loadingIcon"
    :type="type"
    :class="className"
    :iconClass="`!${iconClass}`"
  />
</template>

<style scoped></style>
