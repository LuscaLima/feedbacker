import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UsersService from './users'
import FeedbacksService from './feedbacks'
import { setGlobalLoading } from '../store/global'

const API_ENVS = {
  local: 'http://localhost:3000/',
  production: ''
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)

  // Inject the token in every request
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  response => {
    setGlobalLoading(false)
    return response
  },
  error => {
    // Verify the token
    if (error.status === 401) {
      router.push({ name: 'Home' })
    }

    setGlobalLoading(false)
    return error
  }
)

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
