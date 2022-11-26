import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = (callback: () => void, initialState: any): {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
} => {
  const [formData, setFormData] = useState(initialState)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && value.length === 0) {
        alert('Todos os campos são obrigatórios!')
        return
      }
    }
    callback()
  }

  return {
    onChange,
    onSubmit,
    formData
  }
}
