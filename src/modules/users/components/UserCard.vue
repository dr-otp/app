<script setup lang="ts">
import { ref } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'

import type { User } from '@/modules/auth/interfaces'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import UserCreatorPopover from './UserCreatorPopover.vue'

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
  <CustomCard>
    <template #title>@{{ user.username }}</template>
    <template #subtitle>{{ user.email }}</template>
    <template #content>
      <div class="flex gap-2">
        <Tag v-for="(role, index) in user?.roles" :key="index" rounded :value="role" />
      </div>
      <UserCreatorPopover ref="popRef" :user="user.creator" :created-at="user.createdAt" />
    </template>
    <template #footer>
      <section class="flex justify-end gap-2">
        <CustomButton
          v-tooltip.top="'Ver Usuario'"
          @click="handleViewUser"
          :icon="icons.INFO"
          icon-class="text-3xl"
          severity="contrast"
        />
        <CustomButton
          v-tooltip.top="'Editar Usuario'"
          @click="() => console.log('Edit User')"
          :icon="icons.PENCIL"
          severity="info"
        />
        <CustomButton
          v-tooltip.top="'Eliminar Usuario'"
          @click="() => console.log('Delete User')"
          :icon="icons.TRASH"
          severity="danger"
        />
      </section>
    </template>
  </CustomCard>
</template>

<style scoped></style>
