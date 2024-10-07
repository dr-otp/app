import { otpApi } from '@/api/otpApi'
import { getLimitPaginationHelper } from '@/modules/shared/helpers'
import type { ApiListResponse } from '@/modules/shared/interfaces'
import type { Product } from '../interfaces/product.interface'

export const getProductsAction = async (page: number = 1) => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const { data } = await otpApi.get<ApiListResponse<Product>>('/products', { params })

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
