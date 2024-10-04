import { otpApi } from '@/api/otpApi'
import type { User } from '@/modules/users/interfaces'

export const createUpdateUserAction = async (user: Partial<User>): Promise<User> => {
  console.log('🚀 ~ createUpdateUserAction ~ user:', user)
  const userId = user.id

  user = cleanUser(user)

  if (userId && userId !== '') return await updateUser(userId, user)

  return await createUser(user)
}

const cleanUser = (user: Partial<User>) => {
  delete user.id
  delete user.createdAt
  delete user.updatedAt
  delete user.deletedAt
  delete user.creator

  if (!user.password) delete user.password

  return user
}

const createUser = async (user: Partial<User>) => {
  try {
    const { data } = await otpApi.post<User>('/users', user)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}

const updateUser = async (userId: string, user: Partial<User>) => {
  try {
    const { data } = await otpApi.patch<User>(`/users/${userId}`, user)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
