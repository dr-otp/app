<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomPagination from '@/modules/shared/components/CustomPagination.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import LoadingListPage from '@/modules/shared/components/LoadingListPage.vue'
import { usePagination } from '@/modules/shared/composables/usePagination'
import UserCard from '../components/UserCard.vue'
import { useUsers } from '../composables/useUsers'
import { useConfigStore } from '@/modules/shared/stores/config.store'

useConfigStore().setTitle('Usuarios | OTP')
const { users, lastPage, total } = useUsers()
const { page } = usePagination()

const handleNewUser = () => {
  console.log('New User')
}
</script>

<template>
  <ListPage>
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold">Users</h1>
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
      <LoadingListPage v-if="!users" />
      <UserCard v-else v-for="user in users" :key="user.id" :user="user" />
    </template>
    <template #footer>
      <CustomPagination :page="page" :last-page="lastPage" :total-records="total" />
    </template>
  </ListPage>
</template>

<style scoped></style>
