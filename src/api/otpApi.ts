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

otpApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error, e.g., redirect to login page or refresh token
      console.log('Unauthorized access - 401')
      // Add your custom logic here
    }
    return Promise.reject(error)
  }
)

export { otpApi }
