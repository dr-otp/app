import { otpApi } from '@/api/otpApi'
import type { Customer } from '../interfaces'

export const getCustomerAction = async (customerId: string) => {
  try {
    const { data } = await otpApi.get<Customer>(`/customers/${customerId}`)

    return data
  } catch (error) {
    console.info(error)
    throw new Error('Unexpected error')
  }
}
