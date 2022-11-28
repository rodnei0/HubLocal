import React, { useEffect } from 'react'
import {
  Container,
  Box,
  Button,
  Divider,
  TextField,
  Typography
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useForm } from '../../hooks/useForm'
import { getCompany, clearState, companySelector, updateCompany } from './companySlice'
import TopBar from '../../components/TopBar'

const EditCompany: React.FC = () => {
  const { isError, isSuccess, companyData, message } = useAppSelector(companySelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

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
    dispatch(updateCompany({ id, name, cnpj, description, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP }))
  }

  useEffect(() => {
    const getCompaniesList = async (): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await dispatch(getCompany(id!))
      dispatch(clearState())
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCompaniesList()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, formData } = useForm(handleSubmit, initialState)

  useEffect(() => {
    if (Object.keys(companyData).length !== 0) {
      formData.name = companyData.name
      formData.cnpj = companyData.cnpj
      formData.description = companyData.description
      formData.responsibleName = companyData.responsibles[0].name
      formData.responsibleCPF = companyData.responsibles[0].cpf
      formData.responsiblePhone = companyData.responsibles[0].phone
      formData.responsibleCEP = companyData.responsibles[0].address.zipcode.replace(/\D/g, '')
    }
  }, [companyData])

  useEffect(() => {
    if (isSuccess) {
      alert('Dados atualizados com sucesso!')
      navigate('/company-list')
    }

    if (isError) {
      alert(message)
    }
    dispatch(clearState())
  }, [isSuccess, isError])

  return (
    <>
      <TopBar />
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
              disabled
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
                Atualizar
              </Button>
            </Box>
          </Box>
        </Form>
      </Container>
    </>
  )
}

export default EditCompany
