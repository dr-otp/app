import { PrimeIcons as icons } from '@primevue/core/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import { computed, defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomCard from '@shared/components/CustomCard.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import MenuPopup from '@shared/components/MenuPopup.vue'
import { Formatter } from '@shared/helpers'
import { useConfigStore } from '@shared/stores/config.store'
import {
  createUpdateCustomerAction,
  deleteRestoreCustomerAction,
  getCustomerAction
} from '../actions'
import type { DeleteRestoreCustomer } from '../interfaces'
import { customerSchema } from '../schemas/customer.schema'

export default defineComponent({
  props: {
    customerCode: { type: String, required: true }
  },
  components: { CustomCard, CustomInputText, CustomButton, MenuPopup },
  setup: (props) => {
    useConfigStore().setTitle('Cliente | OTP')

    const router = useRouter()
    const toast = useToast()
    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: customerSchema
    })
    const [name, nameAttrs] = defineField('name')
    const [email, emailAttrs] = defineField('email')

    const {
      data: customer,
      isError,
      isLoading,
      refetch
    } = useQuery({
      queryKey: ['customer', props.customerCode],
      queryFn: () => getCustomerAction(props.customerCode),
      retry: false
    })

    const {
      mutate: updateMutation,
      isPending: isUpdatePending,
      isSuccess: isUpdateSuccess,
      data: updatedCustomer
    } = useMutation({
      mutationFn: createUpdateCustomerAction
    })

    const {
      mutate: deleteMutation,
      isPending: isDeletePending,
      isSuccess: isDeleteSuccess,
      data: deletedCustomer
    } = useMutation({
      mutationFn: ({ customerId, isDeleted }: DeleteRestoreCustomer) =>
        deleteRestoreCustomerAction(customerId, isDeleted)
    })

    const onSubmit = handleSubmit(async (values) => updateMutation(values))

    const onDeleteRestore = (customerId: string | undefined, isDeleted: boolean) => {
      if (!customerId) return
      deleteMutation({ customerId, isDeleted })
    }

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'not.found' })
        return
      }
    })

    watch(
      customer,
      () => {
        if (!customer) return

        const title = customer.value?.name
          ? `Cliente ${customer.value.name} | OTP`
          : 'Nuevo cliente | OTP'

        useConfigStore().setTitle(title)
        resetForm({ values: customer.value })
      },
      { deep: true, immediate: true }
    )

    watch([isUpdateSuccess, isDeleteSuccess], ([updateSuccess, deleteSuccess]) => {
      if (updateSuccess) {
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cliente actualizado correctamente',
          life: 1000
        })

        router.replace({
          name: 'home.customer',
          params: { customerCode: updatedCustomer.value!.code }
        })

        resetForm({ values: updatedCustomer.value })
      }

      if (deleteSuccess) {
        toast.add({
          severity: 'warn',
          summary: 'Éxito',
          detail: 'Cliente eliminado correctamente',
          life: 1000
        })

        router.replace({
          name: 'home.customer',
          params: { customerCode: deletedCustomer.value!.code }
        })

        resetForm({ values: deletedCustomer.value })
      }
    })

    watch(
      () => props.customerCode,
      () => refetch()
    )

    return {
      //* Props
      customer,
      icons,

      //* Form fields
      name,
      nameAttrs,
      email,
      emailAttrs,
      errors,
      handleSubmit,
      meta,

      //! Getters
      isPending: computed(() => isUpdatePending.value || isDeletePending.value),

      //? Methods
      onSubmit,
      Formatter,
      onDeleteRestore
    }
  }
})
