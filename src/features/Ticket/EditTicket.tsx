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
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useForm } from '../../hooks/useForm'
import { getTicket, clearState, ticketSelector, updateTicket } from './ticketSlice'
import TopBar from '../../components/TopBar'
import { getUsers, userSelector } from '../User/userSlice'

const EditTicket: React.FC = () => {
  const { isError, isSuccess, ticketData, message } = useAppSelector(ticketSelector)
  const { usersList } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [responsibleId, setResponsibleId] = useState('')
  const { id } = useParams<{ id: string }>()

  const handleResponsibleChange = (event: SelectChangeEvent): void => {
    setResponsibleId(event.target.value)
  }

  const handleStatusChange = (event: SelectChangeEvent): void => {
    setStatus(event.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    await dispatch(updateTicket({ id, responsibleId, status }))
    setStatus('')
  }

  useEffect(() => {
    const getData = async (): Promise<void> => {
      await dispatch(getTicket(id as string))
      await dispatch(getUsers())
      dispatch(clearState())
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onSubmit } = useForm(handleSubmit, {})

  useEffect(() => {
    setStatus(ticketData.status)
    setResponsibleId(ticketData.responsibleId)
  }, [ticketData])

  useEffect(() => {
    if (isSuccess) {
      alert('Dados atualizados com sucesso!')
      navigate('/ticket-list')
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
              Editar Ticket
            </Typography>
            <Box sx={styles.dividerContainer}>
              <Divider sx={{ flex: '1' }} />
            </Box>
            <FormControl sx={{ marginBottom: '15px' }}>
              <InputLabel id="teste">Responsável</InputLabel>
              <Select
                id="demo-simple-select"
                value={responsibleId}
                label="Responsável"
                onChange={handleResponsibleChange}
              >
                {usersList.map(user => {
                  return (
                    <MenuItem key={user.id} value={user.id}>{user.email}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ marginBottom: '15px' }}>
              <InputLabel id="teste">Status</InputLabel>
              <Select
                id="demo-simple-select"
                value={status}
                label="Responsável"
                onChange={handleStatusChange}
              >
                <MenuItem key={1} value={'PENDENTE'}>PENDENTE</MenuItem>
                <MenuItem key={2} value={'PROGRESSO'}>PROGRESSO</MenuItem>
                <MenuItem key={3} value={'CONCLUIDO'}>CONCLUIDO</MenuItem>
              </Select>
            </FormControl>
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

export default EditTicket
