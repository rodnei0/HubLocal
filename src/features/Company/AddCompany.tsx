import React, { useEffect } from 'react'
import {
  Container,
  Box,
  Button,
  Divider,
  TextField,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/Form'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useForm } from '../../hooks/useForm'
import { addCompany, clearState, companySelector } from './companySlice'

const AddCompany: React.FC = () => {
  const { isSuccess, isError, message } = useAppSelector(companySelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const initialState = {
    name: '',
    cnpj: '',
    description: '',
    responsibleName: '',
    responsibleCPF: '',
    responsiblePhone: '',
    responsibleCEP: ''
  }

  const handleSubmit = (): void => {
    const { name, cnpj, description, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP } = formData

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(addCompany({ name, cnpj, description, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP }))
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, formData } = useForm(handleSubmit, initialState)

  useEffect(() => {
    if (isSuccess) {
      alert('Empresa cadastrada com sucesso!')
      navigate('/company-list')
    }

    if (isError) {
      alert(message)
    }
    dispatch(clearState())
  }, [isSuccess, isError])

  return (
    <>
      <Container component={'main'}>
        <Form onSubmit={onSubmit}>
          <Box sx={styles.container}>
            <Typography sx={styles.title} variant="h4" component="h1">
              Cadastrar Empresa
            </Typography>
            <Box sx={styles.dividerContainer}>
              <Divider sx={{ flex: '1' }} />
            </Box>
            <TextField
              id="name"
              name="name"
              sx={styles.input}
              label="Nome"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.name}
            />
            <TextField
              id="cnpj"
              name="cnpj"
              sx={styles.input}
              label="CNPJ"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.cnpj}
            />
            <TextField
              id="description"
              name="description"
              sx={styles.input}
              label="Descrição"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.description}
            />
            <Box sx={styles.dividerContainer}>
              <Divider sx={{ flex: '1' }} />
            </Box>
            <Typography sx={styles.subtitle} variant="h6" component="span">
              Responsável:
            </Typography>
            <TextField
              id="responsibleName"
              name="responsibleName"
              sx={styles.input}
              label="Nome"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.responsibleName}
            />
            <TextField
              id="responsibleCPF"
              name="responsibleCPF"
              sx={styles.input}
              label="CPF"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.responsibleCPF}
            />
            <TextField
              id="responsiblePhone"
              name="responsiblePhone"
              sx={styles.input}
              label="Telefone"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.responsiblePhone}
            />
            <TextField
              id="responsibleCEP"
              name="responsibleCEP"
              sx={styles.input}
              label="CEP"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.responsibleCEP}
            />
            <Box sx={styles.actionsContainer}>
              <Button id="signIn" variant="contained" type="submit">
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Form>
      </Container>
    </>
  )
}

export default AddCompany
