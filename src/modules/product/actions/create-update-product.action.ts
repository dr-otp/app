import { otpApi } from '@/api/otpApi'
import type { Product } from '../interfaces/product.interface'

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id

  product = cleanProduct(product)

  if (productId && productId !== '') return updateProduct(product)

  return createProduct(product)
}

const cleanProduct = (product: Partial<Product>) => {
  delete product.id
  delete product.createdAt
  delete product.updatedAt
  delete product.deletedAt
  delete product.createdBy
  delete product.updatedBy
  delete product.deletedBy
  delete product.code

  if (product.price) product.price = parseFloat(product.price.toString()).toFixed(8)

  return product
}

const createProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await otpApi.post<Product>('/products', product)

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}

const updateProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await otpApi.put<Product>(`/products/${product.id}`, product)

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
