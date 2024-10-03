import { otpApi } from '@/api/otpApi'
import { getLimitPaginationHelper } from '@shared/helpers'
import type { ApiListResponse } from '@shared/interfaces'
import type { Customer } from '../interfaces/customer.interface'

export const getCustomersAction = async (page: number = 1) => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const { data } = await otpApi.get<ApiListResponse<Customer>>('/customers', { params })

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Unexpected error')
  }
}
