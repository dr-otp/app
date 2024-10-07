import { otpApi } from '@/api/otpApi'
import type { Product } from '../interfaces/product.interface'

export const deleteRestoreProductAction = async (
  productId: string,
  isDeleted: boolean
): Promise<Product> => {
  return isDeleted ? deleteProduct(productId) : restoreProduct(productId)
}

const deleteProduct = async (productId: string) => {
  try {
    const { data } = await otpApi.delete<Product>(`/products/${productId}`)

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

const restoreProduct = async (productId: string) => {
  try {
    const { data } = await otpApi.patch<Product>(`/products/${productId}/restore`)

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
