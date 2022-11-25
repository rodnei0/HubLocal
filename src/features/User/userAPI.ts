import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env

const baseAPI = axios.create({
  baseURL: REACT_APP_API_BASE_URL
})

export interface UserData {
  email: string
  password: string
}

const signUp = async (signUpData: UserData): Promise<string> => {
  const response = await baseAPI.post('/users/sign-up', signUpData)
  return response.data
}

const signIn = async (signInData: UserData): Promise<string> => {
  const response = await baseAPI.post('/users/sign-in', signInData)
  return response.data
}

const api = {
  signUp,
  signIn
}

export default api
