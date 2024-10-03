<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

import ButtonsCard from '@shared/components/ButtonsCard.vue'
import InfoPopover from '@shared/components/InfoPopover.vue'
import { useCustomer } from '../composables'
import type { Customer } from '../interfaces/customer.interface'

interface Props {
  customer: Customer
}

defineProps<Props>()
const toast = useToast()
const { deleteMutation, isDeletePending, isDeleteSuccess, deletedCustomer } = useCustomer()

watch(isDeleteSuccess, (value) => {
  if (!value) return
  const isDeleted = deletedCustomer.value?.deletedAt

  toast.add({
    severity: isDeleted ? 'error' : 'info',
    summary: 'Éxito',
    detail: `Cliente ${isDeleted ? 'eliminado' : 'restaurado'} correctamente`,
    life: 1000
  })
})
</script>

<template>
  <BlockUI :blocked="isDeletePending">
    <ButtonsCard
      :deleted="!!customer.deletedAt"
      :created-by="customer.createdBy"
      :created-at="customer.createdAt"
      @on:edit="$router.push({ name: 'home.customer', params: { customerCode: customer.code } })"
      @on:delete="deleteMutation({ customerId: customer.id, isDeleted: !!customer.deletedAt })"
    >
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
    </ButtonsCard>
  </BlockUI>
</template>

<style scoped></style>
