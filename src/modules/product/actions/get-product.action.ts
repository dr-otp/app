import { otpApi } from '@/api/otpApi'
import type { Product } from '../interfaces/product.interface'

const defaultProduct: Product = {
  id: '',
  code: 0,
  name: '',
  price: 0,
  createdAt: '',
  updatedAt: null,
  createdBy: null,
  updatedBy: null,
  deletedBy: null
}

export const getProductAction = async (productId: string): Promise<Product> => {
  if (productId === 'nuevo') return defaultProduct

  try {
    const { data } = await otpApi.get<Product>(`/products/${productId}/code`)

    return { ...data, price: parseFloat(data.price.toString()) }
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
