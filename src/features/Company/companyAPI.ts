import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env

const baseAPI = axios.create({
  baseURL: REACT_APP_API_BASE_URL
})

export interface AddCompanyData {
  id?: string
  name: string
  cnpj: string
  description: string
  responsibleName: string
  responsiblePhone: string
  responsibleCPF: string
  responsibleCEP: string
}

export interface CompanyData {
  id: number
  name: string
  cnpj: string
  description: string
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
}

const addCompany = async (data: AddCompanyData): Promise<void> => {
  await baseAPI.post('companies', data)
}

const getCompany = async (id: string): Promise<CompanyData> => {
  const response = await baseAPI.get(`companies/${id}`)
  return response.data
}

const getCompanies = async (): Promise<CompanyData[]> => {
  const response = await baseAPI.get('companies')
  return response.data
}

const deleteCompany = async (id: number): Promise<void> => {
  await baseAPI.delete(`companies/${id}`)
}

const updateCompany = async (data: AddCompanyData): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await baseAPI.patch(`companies/${data.id!}`, data)
}

const api = {
  addCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
  getCompany
}

export default api
