import { envs } from '@/config/envs'
import axios from 'axios'

const otpApi = axios.create({
  baseURL: envs.apiUrl
})

otpApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

export { otpApi }
