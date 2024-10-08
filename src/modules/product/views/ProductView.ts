import { PrimeIcons as icons } from '@primevue/core/api'
import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { computed, defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { envs } from '@/config/envs'
import { Formatter } from '@/modules/shared/helpers'
import BaseCard from '@shared/components/BaseCard.vue'
import CustomButton from '@shared/components/CustomButton.vue'
import CustomInputNumber from '@shared/components/CustomInputNumber.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import MenuPopup from '@shared/components/MenuPopup.vue'
import { useConfigStore } from '@shared/stores/config.store'
import { useToast } from 'primevue/usetoast'
import { getProductAction } from '../actions'
import { useProduct } from '../composables'
import { productSchema } from '../schema/product.schema'

export default defineComponent({
  props: { productCode: { type: String, required: true } },
  components: { MenuPopup, BaseCard, CustomInputText, CustomInputNumber, CustomButton },
  setup: (props) => {
    const router = useRouter()
    const toast = useToast()
    const configStore = useConfigStore()
    const {
      updateMutation,
      isUpdatePending,
      isUpdateSuccess,
      updatedProduct,

      deleteMutation,
      isDeletePending,
      isDeleteSuccess,
      deletedProduct
    } = useProduct()
    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: productSchema
    })

    const [name, nameAttrs] = defineField('name')
    const [price, priceAttrs] = defineField('price')

    const {
      data: product,
      isError,
      isLoading,
      refetch
    } = useQuery({
      queryKey: ['product', props.productCode],
      queryFn: () => getProductAction(props.productCode),
      retry: false
    })

    const onSubmit = handleSubmit(async (values) => updateMutation(values))
    const onDeleteRestore = (productId?: string, isDeleted?: boolean) => {
      if (!productId) return
      deleteMutation({ productId, isDeleted })
    }

    watchEffect(() => {
      if (isError && !isLoading) return router.replace({ name: 'not.found' })
    })

    watch(
      product,
      () => {
        if (!product) return

        const name = product.value?.name || 'Nuevo producto'
        configStore.setTitle(`${name} ${envs.appName}`)

        resetForm({ values: product.value })
      },
      { immediate: true, deep: true }
    )

    watch([isUpdateSuccess, isDeleteSuccess], ([updateSuccess, deleteSuccess]) => {
      if (updateSuccess) {
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto actualizado correctamente',
          life: 1000
        })

        router.replace({
          name: 'product.detail',
          params: { productCode: updatedProduct.value!.code }
        })

        resetForm({ values: updatedProduct.value })
      }

      if (deleteSuccess) {
        const isDeleted = !!deletedProduct.value!.deletedAt

        toast.add({
          severity: isDeleted ? 'error' : 'info',
          summary: 'Éxito',
          detail: `Cliente ${isDeleted ? 'eliminado' : 'restaurado'} correctamente`,
          life: 1000
        })

        router.replace({
          name: 'product.detail',
          params: { productCode: deletedProduct.value!.code }
        })

        resetForm({ values: deletedProduct.value })
      }
    })

    watch(
      () => props.productCode,
      () => refetch()
    )

    return {
      //* Props
      product,

      //* Form
      name,
      nameAttrs,
      price,
      priceAttrs,

      //! Getters
      meta,
      errors,
      icons,
      isPending: computed(() => isUpdatePending.value || isDeletePending.value),
      Formatter,

      //? Methods
      onSubmit,
      onDeleteRestore
    }
  }
})
