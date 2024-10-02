<script setup lang="ts">
import CustomPagination from '@shared/components/CustomPagination.vue'
import ListPage from '@shared/components/ListPage.vue'
import LoadingListPage from '@shared/components/LoadingListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import UserCard from '../components/UserCard.vue'
import { useUsers } from '../composables/useUsers'

useConfigStore().setTitle('Usuarios | OTP')
const { users, lastPage, total, isFetching, isLoading, isPlaceholderData } = useUsers()
const { page } = usePagination()

const handleNewUser = () => {
  console.log('New User')
}
</script>

<template>
  <ListPage
    :blockBody="isFetching && isPlaceholderData"
    title="Usuarios"
    label="Nuevo Usuario"
    @on:click="handleNewUser"
    :btn-disabled="isLoading && !isPlaceholderData"
  >
    <template #body>
      <LoadingListPage v-if="isLoading && !isPlaceholderData" />
      <UserCard v-else v-for="user in users" :key="user.id" :user="user" />
    </template>
    <template #footer>
      <CustomPagination :page="page" :last-page="lastPage" :total-records="total" />
    </template>
  </ListPage>
</template>

<style scoped></style>
