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
import { getLocation, clearState, locationSelector, updateLocation } from './locationSlice'
import TopBar from '../../components/TopBar'

const EditLocation: React.FC = () => {
  const { isError, isSuccess, locationData, message } = useAppSelector(locationSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const initialState = {
    name: '',
    cep: '',
    responsibleName: '',
    responsibleCPF: '',
    responsiblePhone: '',
    responsibleCEP: ''
  }

  const handleSubmit = async (): Promise<void> => {
    const { name, cep, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP } = formData

    await dispatch(updateLocation({ id, name, cep, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP }))
  }

  useEffect(() => {
    const getLocationsList = async (): Promise<void> => {
      await dispatch(getLocation(id as string))
      dispatch(clearState())
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLocationsList()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, formData } = useForm(handleSubmit, initialState)

  useEffect(() => {
    if (Object.keys(locationData).length !== 0) {
      formData.name = locationData.name
      formData.cep = locationData.address.zipcode.replace(/\D/g, '')
      formData.responsibleName = locationData.responsibles[0].name
      formData.responsibleCPF = locationData.responsibles[0].cpf
      formData.responsiblePhone = locationData.responsibles[0].phone
      formData.responsibleCEP = locationData.responsibles[0].address.zipcode.replace(/\D/g, '')
    }
  }, [locationData])

  useEffect(() => {
    if (isSuccess) {
      alert('Dados atualizados com sucesso!')
      navigate('/location-list')
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
              Editar Local
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
              id="cep"
              name="cep"
              sx={styles.input}
              label="CEP"
              type="text"
              variant="outlined"
              onChange={onChange}
              value={formData.cep}
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

export default EditLocation
