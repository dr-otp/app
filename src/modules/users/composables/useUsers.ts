import { ref, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

import { usePagination } from '@/modules/shared/composables/usePagination'
import { getUsersAction } from '../actions/get-users.action'

export const useUsers = () => {
  const queryClient = useQueryClient()
  const { page } = usePagination()
  const lastPage = ref(1)
  const total = ref(0)

  const { data: users = [] } = useQuery({
    queryKey: ['users', { page }],
    queryFn: () => getUsers()
  })

  watchEffect(() => {
    if (page.value > 1)
      queryClient.prefetchQuery({
        queryKey: ['users', { page: page.value - 1 }],
        queryFn: () => getUsers()
      })

    queryClient.prefetchQuery({
      queryKey: ['users', { page: page.value + 1 }],
      queryFn: () => getUsers()
    })
  })

  const getUsers = async () => {
    const { data, meta } = await getUsersAction(page.value)
    lastPage.value = meta.lastPage
    total.value = meta.total
    return data
  }

  return {
    //* Props
    users,
    lastPage,
    total

    //! Getters
    //? Methods
  }
}
