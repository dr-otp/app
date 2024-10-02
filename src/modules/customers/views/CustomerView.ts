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

export default defineComponent({
  props: {
    customerId: { type: String, required: true }
  },
  components: { CustomCard, CustomInputText, CustomButton },
  setup: (props) => {
    useConfigStore().setTitle('Cliente | OTP')

    const { defineField, errors, handleSubmit } = useForm({ validationSchema: customerSchema })
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
      data: updatedProduct
    } = useMutation({
      mutationFn: createUpdateCustomerAction
    })

    const onSubmit = handleSubmit(async (values) => {
      console.log('onSubmit Llamado')
      console.log(values)

      // mutate(values)
    })

    watch(customer, () => {
      if (customer) useConfigStore().setTitle(`Cliente ${customer.value?.name} | OTP`)
    })

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

      //! Getters
      //? Methods
      onSubmit,
      Formatter
    }
  }
})
