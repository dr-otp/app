<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomPagination from '@/modules/shared/components/CustomPagination.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import LoadingListPage from '@/modules/shared/components/LoadingListPage.vue'
import { useConfigStore } from '@/modules/shared/stores/config.store'
import VoucherCard from '../components/VoucherCard.vue'

useConfigStore().setTitle('Vales | OTP')
const visible = ref(false)
const vouchers = []

const openDialog = () => {
  visible.value = true
}

const updateDialog = (value: boolean) => {
  visible.value = value
}
</script>

<template>
  <ListPage>
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-4xl font-semibold">Vales</h1>
        <CustomButton label="Nuevo Vale" @click="openDialog" :icon="icons.PLUS" icon-pos="right" />
      </div>
    </template>
    <template #body>
      <LoadingListPage v-if="!vouchers || vouchers.length === 0" />
      <VoucherCard v-for="voucher in vouchers" :key="voucher.id" :voucher="voucher" />
    </template>
    <template #footer>
      <CustomPagination :page="1" :last-page="1" :total-records="1" />
    </template>
  </ListPage>
</template>
