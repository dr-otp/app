<script setup lang="ts">
import CustomPagination from '@shared/components/CustomPagination.vue'
import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import CustomerCard from '../components/CustomerCard.vue'
import { useCustomers } from '../composables/useCustomers'

useConfigStore().setTitle('Clientes | OTP')
const { page } = usePagination()
const { customers, lastPage, total, isFetching, isLoading, isPlaceholderData } = useCustomers()
</script>

<template>
  <ListPage
    title="Clientes"
    label="Nuevo Cliente"
    :blockBody="isFetching && isPlaceholderData"
    :btn-disabled="isLoading && !isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :has-data="!!customers && customers.length > 0"
    @on:click="$router.push({ name: 'home.customer', params: { customerId: 'nuevo' } })"
  >
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
