<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/auth.store'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<template>
  <CustomCard class="dark:bg-gray-900 border dark:border-gray-700">
    <template #content>
      <!-- banner -->
      <section class="w-full h-[15rem]">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
          class="w-full h-full rounded-tl-lg rounded-tr-lg"
        />
      </section>
      <!-- profile summary -->
      <section class="flex flex-col gap-4 items-center -mt-20">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg"
          class="w-40 border-4 dark:border-gray-700 border-white rounded-full"
        />
        <p class="text-4xl">@{{ user?.username }}</p>
        <p class="text-2xl not:dark:text-gray-700">{{ user?.email }}</p>
        <div class="flex gap-2">
          <Tag v-for="(role, index) in user?.roles" :key="index" rounded :value="role" />
        </div>
      </section>
    </template>
  </CustomCard>
</template>

<style scoped></style>
