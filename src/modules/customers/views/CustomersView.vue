<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomPagination from '@shared/components/CustomPagination.vue'
import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import CustomerCard from '../components/CustomerCard.vue'
import { useCustomers } from '../composables/useCustomers'

useConfigStore().setTitle('Clientes | OTP')
const { page } = usePagination()
const { customers, lastPage, total, isFetching, isLoading, isPlaceholderData } = useCustomers()
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}
</script>

<template>
  <ListPage
    :blockBody="isFetching && isPlaceholderData"
    title="Clientes"
    label="Nuevo Cliente"
    @on:click="() => {}"
    :btn-disabled="isLoading && !isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :has-data="!!customers && customers.length > 0"
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
      <CustomerCard
        v-for="customer in customers"
        :key="customer.id"
        :customer="customer"
        @on:edit="
          $router.push({
            name: 'home.customer',
            params: { customerId: customer.id }
          })
        "
      />
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
