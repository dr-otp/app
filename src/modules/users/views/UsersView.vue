<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomPagination from '@/modules/shared/components/CustomPagination.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import LoadingListPage from '@/modules/shared/components/LoadingListPage.vue'
import { usePagination } from '@/modules/shared/composables/usePagination'
import { useConfigStore } from '@/modules/shared/stores/config.store'
import UserCard from '../components/UserCard.vue'
import { useUsers } from '../composables/useUsers'

useConfigStore().setTitle('Usuarios | OTP')
const { users, lastPage, total, isFetching, isLoading } = useUsers()
const { page } = usePagination()

const handleNewUser = () => {
  console.log('New User')
}
</script>

<template>
  <ListPage>
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-4xl font-semibold">Usuarios</h1>
        <CustomButton
          label="Nuevo Usuario"
          @click="handleNewUser"
          :icon="icons.PLUS"
          icon-pos="right"
          :disabled="!users"
        />
      </div>
    </template>
    <template #body>
      <LoadingListPage v-if="isLoading && isFetching" />
      <UserCard v-else v-for="user in users" :key="user.id" :user="user" />
    </template>
    <template #footer>
      <CustomPagination :page="page" :last-page="lastPage" :total-records="total" />
    </template>
  </ListPage>
</template>

<style scoped></style>
