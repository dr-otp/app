import { otpApi } from '@/api/otpApi'
import type { ApiListResponse } from '@shared/interfaces'
import { getLimitPaginationHelper } from '@shared/helpers'

export const getVouchersAction = async (page: number = 1) => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const { data } = await otpApi.get<ApiListResponse<unknown>>('/vouchers', { params })

    return data
  } catch (error) {
    console.log(`Error: ${error}`)
    throw new Error('Unexpected error')
  }
}
