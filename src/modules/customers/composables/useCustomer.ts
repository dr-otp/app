import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUpdateCustomerAction, deleteRestoreCustomerAction } from '../actions'
import type { DeleteRestoreCustomer } from '../interfaces'

export const useCustomer = () => {
  const queryClient = useQueryClient()

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
      deleteRestoreCustomerAction(customerId, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.setQueryData(['customer', data.code.toString()], data)
    }
  })

  return {
    //* Props
    updateMutation,
    isUpdatePending,
    isUpdateSuccess,
    updatedCustomer,

    deleteMutation,
    isDeletePending,
    isDeleteSuccess,
    deletedCustomer

    //! Getters

    //? Methods
  }
}
