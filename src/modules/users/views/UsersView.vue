<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'

import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import CustomPagination from '@/modules/shared/components/CustomPagination.vue'
import ListPage from '@/modules/shared/components/ListPage.vue'
import LoadingListPage from '@/modules/shared/components/LoadingListPage.vue'
import { usePagination } from '@/modules/shared/composables/usePagination'
import { useUsers } from '../composables/useUsers'

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
      <CustomCard v-else v-for="user in users" :key="user.id">
        <template #title>@{{ user.username }}</template>
        <template #subtitle>{{ user.email }}</template>
        <template #content>
          <div class="flex gap-2">
            <Tag v-for="(role, index) in user?.roles" :key="index" rounded :value="role" />
          </div>
        </template>
        <template #footer>
          <section class="flex justify-end gap-2">
            <CustomButton
              v-tooltip.top="'Editar Usuario'"
              @click="() => console.log('Edit User')"
              :icon="icons.PENCIL"
              severity="info"
            />
            <CustomButton
              v-tooltip.top="'Eliminar Usuario'"
              @click="() => console.log('Delete User')"
              :icon="icons.TRASH"
              severity="danger"
            />
          </section>
        </template>
      </CustomCard>
    </template>
    <template #footer>
      <CustomPagination :page="page" :last-page="lastPage" :total-records="total" />
    </template>
  </ListPage>
</template>

<style scoped></style>
