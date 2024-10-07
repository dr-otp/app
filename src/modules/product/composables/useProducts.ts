import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watchEffect } from 'vue'

import { usePagination } from '@shared/composables/usePagination'
import { getProductsAction } from '../actions'

export const useProducts = () => {
  const queryClient = useQueryClient()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const {
    data: products,
    isFetching,
    isLoading,
    isPlaceholderData
  } = useQuery({
    queryKey: ['products', { page }],
    queryFn: () => getUsers(),
    placeholderData: keepPreviousData
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['products', { page: page.value - 1 }],
        queryFn: () => getUsers()
      })

    queryClient.prefetchQuery({
      queryKey: ['products', { page: page.value + 1 }],
      queryFn: () => getUsers()
    })
  })

  const getUsers = async () => {
    const { data, meta } = await getProductsAction(page.value)
    lastPage.value = meta.lastPage
    total.value = meta.total
    return data
  }

  return {
    //* Props
    products,
    lastPage,
    total,
    isFetching,
    isLoading,
    isPlaceholderData

    //! Getters
    //? Methods
  }
}
