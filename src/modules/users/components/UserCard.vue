<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import type { User } from '@/modules/auth/interfaces'
import CustomButton from '@shared/components/CustomButton.vue'
import BaseCard from '@shared/components/BaseCard.vue'
import InfoPopover from '@shared/components/InfoPopover.vue'

interface Props {
  user: User
}

defineProps<Props>()
const popRef = ref<any>(null)

const handleViewUser = (evt: MouseEvent) => {
  if (!popRef.value) return

  popRef.value.open(evt)
}
</script>

<template>
  <BaseCard>
    <template #title>@{{ user.username }}</template>
    <template #subtitle>{{ user.email }}</template>
    <template #content>
      <div class="flex gap-2">
        <Tag v-for="(role, index) in user?.roles" :key="index" rounded :value="role" />
      </div>
      <InfoPopover
        title="Creado por:"
        ref="popRef"
        :user="user.creator"
        :created-at="user.createdAt"
      />
    </template>
    <template #footer>
      <section class="flex justify-end gap-2">
        <CustomButton
          v-tooltip.top="'Info'"
          @click="handleViewUser"
          :icon="icons.INFO"
          icon-class="text-3xl"
          severity="contrast"
        />
        <CustomButton
          v-tooltip.top="'Editar'"
          @click="() => console.log('Edit User')"
          :icon="icons.PENCIL"
          severity="info"
        />
        <CustomButton
          v-tooltip.top="'Eliminar'"
          @click="() => console.log('Delete User')"
          :icon="icons.TRASH"
          severity="danger"
        />
      </section>
    </template>
  </BaseCard>
</template>

<style scoped></style>
