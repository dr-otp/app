<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

import ButtonsCard from '@shared/components/ButtonsCard.vue'
import InfoPopover from '@shared/components/InfoPopover.vue'
import type { Product } from '../interfaces/product.interface'
import { useProduct } from '../composables/useProduct'

interface Props {
  product: Product
}

defineProps<Props>()
const toast = useToast()
const { deleteMutation, isDeletePending, isDeleteSuccess, deletedProduct } = useProduct()

watch(isDeleteSuccess, (value) => {
  if (!value) return
  const isDeleted = deletedProduct.value?.deletedAt

  toast.add({
    severity: isDeleted ? 'error' : 'info',
    summary: 'Éxito',
    detail: `Producto ${isDeleted ? 'eliminado' : 'restaurado'} correctamente`,
    life: 1000
  })
})
</script>

<template>
  <BlockUI :blocked="isDeletePending">
    <ButtonsCard
      :deleted="!!product.deletedAt"
      :created-by="product.createdBy"
      :created-at="product.createdAt"
      @on:edit="$router.push({ name: 'product.detail', params: { productCode: product.code } })"
      @on:delete="deleteMutation({ productId: product.id, isDeleted: !!product.deletedAt })"
    >
      <template #title>
        <Tag rounded>
          <template #default>
            <span class="text-2xl"># {{ product.code }}</span>
          </template>
        </Tag>
      </template>
      <template #subtitle>
        <section class="flex flex-col">
          <span>
            <i :class="[icons.USER, 'mr-2']" />
            {{ product.name }}
          </span>
          <span>
            <i :class="[icons.ENVELOPE, 'mr-2']" />
          </span>
        </section>
      </template>
      <template #content>
        <InfoPopover
          title="Creado por:"
          ref="popRef"
          :user="product.createdBy"
          :created-at="product.createdAt"
        />
      </template>
    </ButtonsCard>
  </BlockUI>
</template>

<style scoped></style>
