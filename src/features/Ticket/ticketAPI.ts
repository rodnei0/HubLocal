import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env

const baseAPI = axios.create({
  baseURL: REACT_APP_API_BASE_URL
})

export interface UpdateTicketData {
  id?: string
  responsibleId: string
  status: string
}

export interface TicketData {
  id?: string
  title: string
  creationDate: string
  updateDate: string
  createdBy: {
    email: string
  }
  updateById: string
  responsibleId: string
  location: {
    name: string
  }
  status: string
}

const getTicket = async (id: string): Promise<TicketData> => {
  const response = await baseAPI.get(`tickets/${id}`)
  return response.data
}

const getTickets = async (): Promise<TicketData[]> => {
  const response = await baseAPI.get('tickets')
  return response.data
}
const updateTicket = async (data: UpdateTicketData): Promise<void> => {
  console.log(data)
  await baseAPI.patch(`tickets/${data.id as string}`, data)
}

const api = {
  getTickets,
  updateTicket,
  getTicket
}

export default api
