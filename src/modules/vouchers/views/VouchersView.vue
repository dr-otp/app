<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomPagination from '@shared/components/CustomPagination.vue'
import ListPage from '@shared/components/ListPage.vue'
import { useConfigStore } from '@shared/stores/config.store'
import VoucherCard from '../components/VoucherCard.vue'
import { useVouchers } from '../composables/useVouchers'
import { usePagination } from '@shared/composables/usePagination'

useConfigStore().setTitle('Vales | OTP')
const { vouchers, total, lastPage, isLoading, isFetching, isPlaceholderData } = useVouchers()
const { page } = usePagination()
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}
</script>

<template>
  <ListPage
    :blockBody="isFetching && isPlaceholderData"
    title="Vales"
    label="Nuevo Vale"
    @on:click="() => {}"
    :btn-disabled="isLoading && !isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :has-data="!!vouchers && vouchers.length > 0"
  >
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-4xl font-semibold">Clientes</h1>
        <CustomButton
          label="Nuevo Cliente"
          @click="openDialog"
          :icon="icons.PLUS"
          icon-pos="right"
        />
      </div>
    </template>
    <template #body>
      <VoucherCard v-for="item in vouchers" :key="item.id" :customer="item" />
    </template>
    <template #footer>
      <CustomPagination
        :page="page"
        :last-page="lastPage"
        :total-records="total"
        :loading="isLoading && !isPlaceholderData"
      />
    </template>
  </ListPage>
</template>
