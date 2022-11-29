import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env

const baseAPI = axios.create({
  baseURL: REACT_APP_API_BASE_URL
})

export interface AddLocationData {
  id?: string
  name: string
  cep: string
  companyId?: string
  responsibleName: string
  responsiblePhone: string
  responsibleCPF: string
  responsibleCEP: string
}

export interface LocationData {
  id: number
  name: string
  cep: string
  responsibles: [
    {
      name: string
      cpf: string
      phone: string
      address: {
        zipcode: string
      }
    }
  ]
  company: {
    name: string
  }
  address: {
    zipcode: string
  }
}

const addLocation = async (data: AddLocationData): Promise<void> => {
  await baseAPI.post('locations', data)
}

const getLocation = async (id: string): Promise<LocationData> => {
  const response = await baseAPI.get(`locations/${id}`)
  return response.data
}

const getLocations = async (): Promise<LocationData[]> => {
  const response = await baseAPI.get('locations')
  return response.data
}

const deleteLocation = async (id: number): Promise<void> => {
  await baseAPI.delete(`locations/${id}`)
}

const updateLocation = async (data: AddLocationData): Promise<void> => {
  await baseAPI.patch(`locations/${data.id as string}`, data)
}

const api = {
  addLocation,
  getLocations,
  deleteLocation,
  updateLocation,
  getLocation
}

export default api
