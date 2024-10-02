<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['dialog:close', 'dialog:update'])
const isVisible = ref(false)
const value = ref()

const handleResendCode = () => {
  console.log('Resend code')
}

const handleSubmitCode = () => {
  console.log('Submit code')
}

watch(
  () => props.visible,
  (value) => {
    isVisible.value = value
  }
)
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    @update:visible="emits('dialog:update', $event)"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col items-center">
      <div class="font-bold text-xl mb-2">Autentica la generación del vale</div>
      <p class="text-surface-500 dark:text-surface-400 block mb-8">
        Se ha enviado un código de verificación a tu correo electrónico.
      </p>
      <InputOtp v-model="value" :length="6" style="gap: 0">
        <template #default="{ attrs, events, index }">
          <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
          <div v-if="index === 3" class="px-4">
            <i class="pi pi-minus" />
          </div>
        </template>
      </InputOtp>
      <div class="flex justify-between mt-8 self-stretch">
        <Button label="Resend Code" link class="p-0" @click="handleResendCode" />
        <Button label="Submit Code" @click="handleSubmitCode" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.custom-otp-input {
  width: 48px;
  height: 48px;
  font-size: 24px;
  appearance: none;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0;
  border: 1px solid var(--p-inputtext-border-color);
  background: transparent;
  outline-offset: -2px;
  outline-color: transparent;
  border-right: 0 none;
  transition: outline-color 0.3s;
  color: var(--p-inputtext-color);
}

.custom-otp-input:focus {
  outline: 2px solid var(--p-focus-ring-color);
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: var(--p-inputtext-border-color);
}
</style>
