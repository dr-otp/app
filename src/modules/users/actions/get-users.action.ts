import { otpApi } from '@/api/otpApi'
import type { User } from '@/modules/auth/interfaces'
import { getLimitPaginationHelper } from '@/modules/shared/helpers'
import type { ApiListResponse } from '@/modules/shared/interfaces'

export const getUsersAction = async (page: number = 1): Promise<ApiListResponse<User>> => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const { data } = await otpApi.get<ApiListResponse<User>>('/users', { params })

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Unexpected error')
  }
}
