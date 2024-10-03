import { otpApi } from '@/api/otpApi'
import type { Customer } from '../interfaces'

export const deleteRestoreCustomerAction = async (
  customerId: string,
  isDeleted: boolean
): Promise<Customer> => {
  if (isDeleted) return await restoreCustomer(customerId)

  return await deleteCustomer(customerId)
}

const deleteCustomer = async (customerId: string) => {
  try {
    const { data } = await otpApi.delete<Customer>(`/customers/${customerId}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}

const restoreCustomer = async (customerId: string) => {
  try {
    const { data } = await otpApi.patch<Customer>(`/customers/${customerId}/restore`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
