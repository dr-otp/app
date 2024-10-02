<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import CustomButton from '@shared/components/CustomButton.vue'
import InfoPopover from '@shared/components/InfoPopover.vue'
import CustomCard from '@shared/components/CustomCard.vue'
import type { Customer } from '../interfaces/customer.interface'

interface Props {
  customer: Customer
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
    <template #title>
      <Tag rounded>
        <template #default>
          <span class="text-2xl"># {{ customer.code }}</span>
        </template>
      </Tag>
    </template>
    <template #subtitle>
      <section class="flex flex-col">
        <span>
          <i :class="[icons.USER, 'mr-2']" />
          {{ customer.name }}
        </span>
        <span>
          <i :class="[icons.ENVELOPE, 'mr-2']" />
          {{ customer.email }}
        </span>
      </section>
    </template>
    <template #content>
      <InfoPopover
        title="Creado por:"
        ref="popRef"
        :user="customer.createdBy"
        :created-at="customer.createdAt"
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
  </CustomCard>
</template>

<style scoped></style>
