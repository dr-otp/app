import { ref, watchEffect } from 'vue'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'

import { usePagination } from '@shared/composables/usePagination'
import { getVouchersAction } from '../actions'

export const useVouchers = () => {
  const queryClient = useQueryClient()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const {
    data: vouchers,
    isFetching,
    isLoading,
    isPlaceholderData
  } = useQuery({
    queryKey: ['vouchers', { page }],
    queryFn: () => getVouchers(),
    placeholderData: keepPreviousData
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['vouchers', { page: page.value - 1 }],
        queryFn: () => getVouchers()
      })

    queryClient.prefetchQuery({
      queryKey: ['vouchers', { page: page.value + 1 }],
      queryFn: () => getVouchers()
    })
  })

  const getVouchers = async () => {
    const { data, meta } = await getVouchersAction(page.value)
    lastPage.value = meta.lastPage
    total.value = meta.total
    return data
  }

  return {
    //* Props
    vouchers,
    lastPage,
    total,
    isFetching,
    isLoading,
    isPlaceholderData

    //! Getters
    //? Methods
  }
}
