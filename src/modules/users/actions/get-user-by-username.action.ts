import { otpApi } from '@/api/otpApi'
import type { User } from '@/modules/users/interfaces'

export const getUserByUsernameAction = async (username: string): Promise<User> => {
  if (username === 'nuevo')
    return {
      id: '',
      username: '',
      email: '',
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      creator: null,
      password: null
    }

  try {
    const { data } = await otpApi.get<User>(`/users/username/${username}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
