<script setup lang="ts">
import CustomPagination from '@shared/components/CustomPagination.vue'
import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import { useProducts } from '../composables'
import ProductCard from '../components/ProductCard.vue'

useConfigStore().setTitle('Clientes | OTP')
const { page } = usePagination()
const { products, lastPage, total, isFetching, isLoading, isPlaceholderData } = useProducts()
</script>

<template>
  <ListPage
    title="Productos"
    label="Nuevo Producto"
    :blockBody="isFetching && isPlaceholderData"
    :btn-disabled="isLoading && !isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :has-data="!!products && products.length > 0"
    @on:click="$router.push({ name: 'product.detail', params: { productCode: 'nuevo' } })"
  >
    <template #body>
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
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
