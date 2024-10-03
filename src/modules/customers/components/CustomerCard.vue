<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { ref, watch } from 'vue'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomCard from '@shared/components/CustomCard.vue'
import InfoPopover from '@shared/components/InfoPopover.vue'
import type { Customer } from '../interfaces/customer.interface'
import { useCustomer } from '../composables'
import { useAuthStore } from '@/modules/auth/store/auth.store'

interface Props {
  customer: Customer
}

defineProps<Props>()
const popRef = ref<any>(null)
const toast = useToast()
const authStore = useAuthStore()
const { deleteMutation, isDeletePending, isDeleteSuccess, deletedCustomer } = useCustomer()
const handleViewUser = (evt: MouseEvent) => {
  if (!popRef.value) return

  popRef.value.open(evt)
}

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
    <CustomCard :deleted="!!customer.deletedAt">
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
        <section class="flex justify-between flex-row-reverse gap-2">
          <section class="flex gap-2">
            <CustomButton
              v-tooltip.top="'Info'"
              @click="handleViewUser"
              :icon="icons.INFO"
              icon-class="text-3xl"
              severity="contrast"
            />
            <CustomButton
              v-tooltip.top="'Editar'"
              @click="
                $router.push({
                  name: 'home.customer',
                  params: { customerCode: customer.code }
                })
              "
              :icon="icons.PENCIL"
              severity="info"
            />
            <CustomButton
              v-tooltip.top="customer.deletedAt ? 'Restaurar' : 'Eliminar'"
              @click="deleteMutation({ customerId: customer.id, isDeleted: !!customer.deletedAt })"
              :icon="customer.deletedAt ? icons.UNDO : icons.TRASH"
              :severity="customer.deletedAt ? 'secondary' : 'danger'"
              v-if="authStore.isAdmin"
            />
          </section>
          <Tag v-if="!!customer.deletedAt" severity="danger">Eliminado</Tag>
        </section>
      </template>
    </CustomCard>
  </BlockUI>
</template>

<style scoped></style>
