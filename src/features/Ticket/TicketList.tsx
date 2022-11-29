import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearState, ticketSelector, getTickets } from './ticketSlice'
import styles from './styles'
import TopBar from '../../components/TopBar'
import Loader from '../../components/Loader'

interface TicketDataList {
  id: string
  title: string
  creationDate: string
  updateDate: string
  createdBy: string
  updateById: string
  status: string
}

const TicketList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { ticketList, isFetching } = useAppSelector(ticketSelector)
  const rows: TicketDataList[] = []
  const navigate = useNavigate()

  if (ticketList.length !== 0) {
    ticketList.forEach(ticket => {
      rows.push({
        id: ticket.id as string,
        title: ticket.title,
        creationDate: ticket.creationDate,
        updateDate: ticket.updateDate,
        createdBy: ticket.createdBy.email,
        updateById: ticket.updateById,
        status: ticket.status
      })
    })
  }

  useEffect(() => {
    const getTicketsList = async (): Promise<void> => {
      await dispatch(getTickets())
      dispatch(clearState())
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getTicketsList()
  }, [])

  return (
    <>
      <TopBar />
      {isFetching
        ? <Loader />
        : (
          <Container component={'main'} sx={styles.container}>
            <Typography sx={styles.title} variant="h4" component="h1">
              Lista de Tickets
            </Typography>
            <Box sx={styles.dividerContainer}>
              <Divider sx={{ flex: '1' }} />
            </Box>
            {ticketList.length === 0
              ? (
                <Box sx={styles.subContainer}>
                  <Typography sx={styles.title} variant="h6" component="h2">
                    Ainda não foram criados tickets! Atualize algum local para que um ticket seja criado.
                  </Typography>
                </Box>
                // eslint-disable-next-line @typescript-eslint/indent
              )
              : (
                <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Título</TableCell>
                        <TableCell align="center">Criação</TableCell>
                        <TableCell align="center">Atualização</TableCell>
                        <TableCell align="center">Criado por</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">{row.title}</TableCell>
                          <TableCell align="center">{row.creationDate}</TableCell>
                          <TableCell align="center">{row.updateDate}</TableCell>
                          <TableCell align="center">{row.createdBy}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => navigate(`/edit-ticket/${row.id}`)} disabled={row.status === 'CONCLUIDO'}><EditIcon /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                // eslint-disable-next-line @typescript-eslint/indent
              )}
          </Container>
          // eslint-disable-next-line @typescript-eslint/indent
        )}
    </>
  )
}

export default TicketList
