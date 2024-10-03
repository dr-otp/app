import { PrimeIcons as icons } from '@primevue/core/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { defineComponent, watch } from 'vue'

import CustomButton from '@shared/components/CustomButton.vue'
import CustomCard from '@shared/components/CustomCard.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import { Formatter } from '@shared/helpers'
import { useConfigStore } from '@shared/stores/config.store'
import { getCustomerAction, createUpdateCustomerAction } from '../actions'
import { customerSchema } from '../schemas/customer.schema'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    customerId: { type: String, required: true }
  },
  components: { CustomCard, CustomInputText, CustomButton },
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
      queryKey: ['customer', props.customerId],
      queryFn: () => getCustomerAction(props.customerId),
      retry: false
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedCustomer
    } = useMutation({
      mutationFn: createUpdateCustomerAction
    })

    const onSubmit = handleSubmit(async (values) => {
      mutate(values)
    })

    watch(
      customer,
      () => {
        if (!customer) return

        useConfigStore().setTitle(`Cliente ${customer.value?.name} | OTP`)
        resetForm({ values: customer.value })
      },
      { deep: true, immediate: true }
    )

    watch(isUpdateSuccess, (value) => {
      if (!value) return

      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Inicio de sesión exitoso',
        life: 1000
      })
      router.replace({
        name: 'home.customer',
        params: { customerId: updatedCustomer.value.id }
      })

      resetForm({ values: updatedCustomer.value })
    })

    watch(
      () => props.customerId,
      () => refetch()
    )

    return {
      //* Props
      customer,
      icons,
      isPending,

      //* Form fields
      name,
      nameAttrs,
      email,
      emailAttrs,
      errors,
      handleSubmit,
      meta,

      //! Getters
      //? Methods
      onSubmit,
      Formatter
    }
  }
})
