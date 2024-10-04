import { otpApi } from '@/api/otpApi'
import type { User } from '@/modules/users/interfaces'

export const deleteRestoreUserAction = async (userId: string, isDeleted: boolean) => {
  if (isDeleted) return await restoreUser(userId)

  return await deleteUser(userId)
}

const restoreUser = async (userId: string) => {
  try {
    const { data } = await otpApi.patch<User>(`/users/${userId}/restore`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}

const deleteUser = async (userId: string) => {
  try {
    const { data } = await otpApi.delete<User>(`/users/${userId}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
