import { otpApi } from '@/api/otpApi'
import type { Customer } from '../interfaces'

export const getCustomerAction = async (customerId: string): Promise<Customer> => {
  if (customerId === 'nuevo')
    return {
      id: '',
      code: 0,
      name: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null
    }

  try {
    const { data } = await otpApi.get<Customer>(`/customers/${customerId}`)

    return data
  } catch (error) {
    console.log(`Error: ${error}`)
    throw new Error('Unexpected error')
  }
}
