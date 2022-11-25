import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env

const baseAPI = axios.create({
  baseURL: REACT_APP_API_BASE_URL
})

interface UserData {
  email: string
  password: string
}

const signUp = async (signUpData: UserData): Promise<void> => {
  await baseAPI.post('/users', signUpData)
}

const signIn = async (signInData: UserData): Promise<void> => {
  await baseAPI.post('/sign-in', signInData)
}

const api = {
  signUp,
  signIn
}

export default api
