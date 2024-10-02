import type { Customer } from '../interfaces'

export const createUpdateCustomerAction = async (customer: Partial<Customer>) => {
  const customerId = customer.id

  if (customerId && customerId !== '') return updateCustomer(customerId, customer)

  return createCustomer(customer)
}

const updateCustomer = async (customerId: string, customer: Partial<Customer>) => {
  try {
    console.log({ customerId, customer })
  } catch (error) {
    console.info(error)
    throw new Error('Unexpected error')
  }
}

const createCustomer = async (customer: Partial<Customer>) => {
  try {
    console.log({ customer })
  } catch (error) {
    console.info(error)
    throw new Error('Unexpected error')
  }
}
