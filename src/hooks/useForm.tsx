import { useState } from 'react'

interface FormData {
  email: string
  password: string
  passwordConfirmation?: string
}

export const useForm = (callback: () => void, initialState: FormData): {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  values: FormData
} => {
  const [values, setValues] = useState(initialState)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    callback()
  }

  return {
    onChange,
    onSubmit,
    values
  }
}
