import { ref, watchEffect } from 'vue'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'

import { usePagination } from '@shared/composables/usePagination'
import { getCustomersAction } from '../actions'

export const useCustomers = () => {
  const queryClient = useQueryClient()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const {
    data: customers,
    isFetching,
    isLoading,
    isPlaceholderData
  } = useQuery({
    queryKey: ['customers', { page }],
    queryFn: () => getUsers(),
    placeholderData: keepPreviousData
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['customers', { page: page.value - 1 }],
        queryFn: () => getUsers()
      })

    queryClient.prefetchQuery({
      queryKey: ['customers', { page: page.value + 1 }],
      queryFn: () => getUsers()
    })
  })

  const getUsers = async () => {
    const { data, meta } = await getCustomersAction(page.value)
    lastPage.value = meta.lastPage
    total.value = meta.total
    return data
  }

  return {
    //* Props
    customers,
    lastPage,
    total,
    isFetching,
    isLoading,
    isPlaceholderData

    //! Getters
    //? Methods
  }
}
