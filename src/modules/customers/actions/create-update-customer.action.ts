import { otpApi } from '@/api/otpApi'
import type { Customer } from '../interfaces'

export const createUpdateCustomerAction = async (
  customer: Partial<Customer>
): Promise<Customer> => {
  const customerId = customer.id

  customer = cleanCustomer(customer)

  if (customerId && customerId !== '') return await updateCustomer(customerId, customer)

  return await createCustomer(customer)
}

const cleanCustomer = (customer: Partial<Customer>) => {
  delete customer.id
  delete customer.code
  delete customer.createdAt
  delete customer.updatedAt
  delete customer.deletedAt
  delete customer.createdBy
  delete customer.updatedBy
  delete customer.deletedBy

  return customer
}

const updateCustomer = async (customerId: string, customer: Partial<Customer>) => {
  try {
    const { data } = await otpApi.patch<Customer>(`/customers/${customerId}`, customer)

    return data
  } catch (error) {
    console.log(`Error: ${error}`)
    throw new Error('Unexpected error')
  }
}

const createCustomer = async (customer: Partial<Customer>) => {
  try {
    const { data } = await otpApi.post('/customers', customer)

    return data
  } catch (error) {
    console.log(`Error: ${error}`)
    throw new Error('Unexpected error')
  }
}
