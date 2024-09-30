<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import OtpDialog from '../components/OtpDialog.vue'
import { ref } from 'vue'
import { useConfigStore } from '@/modules/shared/stores/config.store'

useConfigStore().setTitle('Vales | OTP')
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}

const updateDialog = (value: boolean) => {
  visible.value = value
}
</script>

<template>
  <section
    class="mb-4 border-b-2 border-b-gray-300 dark:border-b-gray-700 py-4 flex justify-between"
  >
    <h1 class="text-5xl">Vales</h1>
    <CustomButton
      label="Nuevo Vale"
      :icon="icons.PLUS_CIRCLE"
      icon-pos="right"
      className="text-6xl"
      @click="openDialog"
    />
  </section>
  <section class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <CustomCard v-for="index in 20" :key="index">
      <template #title>Vale #{{ index }}</template>
      <template #subtitle>Cliente #{{ index }}</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
          repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
          ratione quam perferendis esse, cupiditate neque quas!
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end mt-1">
          <CustomButton label="Ver" :icon="icons.ARROW_RIGHT" icon-pos="right" />
        </div>
      </template>
    </CustomCard>
  </section>

  <OtpDialog :visible="visible" @dialog:update="updateDialog" />
</template>
