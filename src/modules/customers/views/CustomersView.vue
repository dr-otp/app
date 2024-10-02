<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomPagination from '@/modules/shared/components/CustomPagination.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import LoadingListPage from '@/modules/shared/components/LoadingListPage.vue'
import { usePagination } from '@/modules/shared/composables/usePagination'
import { useConfigStore } from '@/modules/shared/stores/config.store'
import CustomerCard from '../components/CustomerCard.vue'
import { useCustomers } from '../composables/useCustomers'

useConfigStore().setTitle('Vales | OTP')
const { page } = usePagination()
const { customers, lastPage, total, isFetching, isLoading } = useCustomers()
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}
</script>

<template>
  <ListPage>
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
      <LoadingListPage v-if="isLoading && isFetching" />
      <CustomerCard v-for="customer in customers" :key="customer.id" :customer="customer" />
    </template>
    <template #footer>
      <CustomPagination :page="page" :last-page="lastPage" :total-records="total" />
    </template>
  </ListPage>
</template>
