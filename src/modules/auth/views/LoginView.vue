<script setup lang="ts">
import { useForm } from 'vee-validate'

import { useConfigStore } from '@/modules/shared/stores/config.store'
import CustomInputPassword from '@shared/components/CustomInputPassword.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import { loginSchema } from '../schemas'

const { darkTheme } = useConfigStore()

const { defineField, errors, handleSubmit, handleReset } = useForm({
  validationSchema: loginSchema
})

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  handleReset()
})
</script>

<template>
  <div class="max-w-[30rem] h-full mx-auto flex items-center flex-col justify-center">
    <h1 class="font-bold text-center text-2xl mb-5">Logo</h1>
    <Card class="w-full">
      <template #title>
        <div class="text-center">Inicio de sesión</div>
      </template>
      <template #content>
        <form @submit="onSubmit" class="flex flex-col gap-6" v-focustrap>
          <CustomInputText
            id="username"
            label="Nombre de usuario"
            v-model="username"
            v-bind="usernameAttrs"
            :error="errors.username"
            autofocus
          />
          <CustomInputPassword
            id="password"
            label="Contraseña"
            type="password"
            v-model="password"
            v-bind="passwordAttrs"
            :error="errors.password"
          />
          <Button
            type="submit"
            :outlined="darkTheme === true ? true : undefined"
            label="Iniciar sesión"
            class="mt-4"
            fluid
          />
        </form>
      </template>
    </Card>
  </div>
</template>
