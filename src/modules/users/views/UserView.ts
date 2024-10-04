import { PrimeIcons as icons } from '@primevue/core/api'
import { useQuery } from '@tanstack/vue-query'
import { useFieldArray, useForm } from 'vee-validate'
import { computed, defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import BaseCard from '@shared/components/BaseCard.vue'
import CustomButton from '@shared/components/CustomButton.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import MenuPopup from '@shared/components/MenuPopup.vue'
import { Formatter } from '@shared/helpers/formatter.helper'
import { useConfigStore } from '@shared/stores/config.store'
import { getUserByUsernameAction } from '../actions'
import { userSchema } from '../schemas/user.schema'
import { UserRole } from '@/modules/users/interfaces'
import { useUser } from '../composables'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  props: { id: { type: String, required: true } },
  components: { BaseCard, CustomInputText, CustomButton, MenuPopup },
  setup: (props) => {
    useConfigStore().setTitle('Usuario | OTP')
    const router = useRouter()
    const toast = useToast()
    const {
      updateMutation,
      isUpdatePending,
      isUpdateSuccess,
      updatedUser,

      deleteMutation,
      isDeletePending,
      isDeleteSuccess,
      deletedUser
    } = useUser()

    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: userSchema
    })

    const [username, usernameAttrs] = defineField('username')
    const [email, emailAttrs] = defineField('email')
    const [password, passwordAttrs] = defineField('password')
    const { fields: roles, remove: removeRole, push: pushRoles } = useFieldArray<UserRole>('roles')

    const {
      data: user,
      isError,
      isLoading,
      refetch
    } = useQuery({
      queryKey: ['user', props.id],
      queryFn: () => getUserByUsernameAction(props.id),
      retry: false
    })

    const toggleRole = (role: UserRole) => {
      const currentRoles = roles.value.map((r) => r.value)
      const hasRole = currentRoles.includes(role)

      hasRole ? removeRole(currentRoles.indexOf(role)) : pushRoles(role)
    }

    const onSubmit = handleSubmit(async (values) => updateMutation(values))
    const onDeleteRestore = (userId: string | undefined, isDeleted: boolean) => {
      if (!userId) return
      deleteMutation({ userId, isDeleted })
    }
    const onNewUser = (): void => {
      if (!user) {
        router.replace({ name: 'user.detail', params: { id: 'nuevo' } })
        return
      }

      router.push({ name: 'user.detail', params: { id: 'nuevo' } })
    }

    watchEffect(() => {
      if (isError.value && !isLoading.value) return router.replace({ name: 'not.found' })
    })

    watch(
      user,
      () => {
        if (!user) return

        const title = user.value?.username ? `${user.value.username} | OTP` : 'Nuevo usuario | OTP'

        useConfigStore().setTitle(title)
        resetForm({ values: user.value })
      },
      { deep: true, immediate: true }
    )

    watch([isUpdateSuccess, isDeleteSuccess], ([updateSuccess, deleteSuccess]) => {
      if (updateSuccess) {
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario actualizado correctamente',
          life: 1000
        })

        router.replace({
          name: 'user.detail',
          params: { id: updatedUser.value!.username }
        })

        resetForm({ values: updatedUser.value })
      }

      if (deleteSuccess) {
        const isDeleted = deletedUser.value?.deletedAt

        toast.add({
          severity: isDeleted ? 'error' : 'info',
          summary: 'Éxito',
          detail: `Usuario ${isDeleted ? 'eliminado' : 'restaurado'} correctamente`,
          life: 1000
        })

        router.replace({
          name: 'user.detail',
          params: { id: deletedUser.value!.username }
        })

        resetForm({ values: deletedUser.value })
      }
    })

    watch(
      () => props.id,
      () => refetch()
    )

    return {
      //* Props
      icons,
      user,
      meta,
      errors,
      isPending: computed(() => isUpdatePending.value || isDeletePending.value),
      UserRole,

      //* Form
      username,
      usernameAttrs,
      email,
      emailAttrs,
      password,
      passwordAttrs,
      roles,

      //! Getters
      //? Methods
      onSubmit,
      toggleRole,
      Formatter,
      hasRole: (role: UserRole) => roles.value.map((r) => r.value).includes(role),
      onDeleteRestore,
      onNewUser
    }
  }
})
