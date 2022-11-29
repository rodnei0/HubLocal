import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/Form'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useForm } from '../../hooks/useForm'
import { addLocation, clearState, locationSelector } from './locationSlice'
import TopBar from '../../components/TopBar'
import { companySelector, getCompanies } from '../Company/companySlice'

const AddLocation: React.FC = () => {
  const { isSuccess, isError, message } = useAppSelector(locationSelector)
  const { companyList } = useAppSelector(companySelector)
  const [companyId, setCompanyId] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const initialState = {
    name: '',
    cep: '',
    responsibleName: '',
    responsibleCPF: '',
    responsiblePhone: '',
    responsibleCEP: ''
  }

  const handleChange = (event: SelectChangeEvent): void => {
    setCompanyId(event.target.value)
  }

  const handleSubmit = (): void => {
    const { name, cep, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP } = formData

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(addLocation({ name, cep, companyId, responsibleName, responsiblePhone, responsibleCPF, responsibleCEP }))
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, formData } = useForm(handleSubmit, initialState)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getCompaniesList = async () => {
      await dispatch(getCompanies())
      dispatch(clearState())
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCompaniesList()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      alert('Local cadastrado com sucesso!')
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
              Cadastrar local
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
            <FormControl>
              <InputLabel id="teste">Empresa</InputLabel>
              <Select
                // labelId="teste"
                id="demo-simple-select"
                value={companyId}
                label="Empresa"
                onChange={handleChange}
              >
                {companyList.map(company => {
                  return (
                    <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
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

export default AddLocation
