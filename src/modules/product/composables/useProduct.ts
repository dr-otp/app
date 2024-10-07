import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUpdateProductAction, deleteRestoreProductAction } from '../actions'

export const useProduct = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedProduct
  } = useMutation({
    mutationFn: createUpdateProductAction
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedProduct
  } = useMutation({
    mutationFn: ({ productId, isDeleted }: any) => deleteRestoreProductAction(productId, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.setQueryData(['product', data.code.toString()], data)
    }
  })

  return {
    //* Props
    updateMutation,
    isUpdatePending,
    isUpdateSuccess,
    updatedProduct,

    deleteMutation,
    isDeletePending,
    isDeleteSuccess,
    deletedProduct

    //! Getters

    //? Methods
  }
}
