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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearState, locationSelector, getLocations, deleteLocation } from './locationSlice'
import styles from './styles'
import TopBar from '../../components/TopBar'

interface LocationDataList {
  id: number
  name: string
  cep: string
  companyName: string
  responsibleName: string
}

const LocationList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { locationList } = useAppSelector(locationSelector)
  const rows: LocationDataList[] = []
  const navigate = useNavigate()
  const [updateList, setUpdateList] = useState(false)

  if (locationList.length !== 0) {
    locationList.forEach(location => {
      rows.push({
        id: location.id,
        name: location.name,
        cep: location.address.zipcode,
        companyName: location.company.name,
        responsibleName: location.responsibles[0].name
      })
    })
  }

  const handleDelete = async (id: number): Promise<void> => {
    const result = confirm('Tem certeza que deseja deletar este local?')
    if (result) {
      await dispatch(deleteLocation(id))
      setUpdateList(!updateList)
    }
  }

  useEffect(() => {
    const getLocationsList = async (): Promise<void> => {
      await dispatch(getLocations())
      dispatch(clearState())
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLocationsList()
  }, [updateList])

  return (
    <>
      <TopBar />
      <Container component={'main'} sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Lista de Locais
        </Typography>
        <Box sx={styles.dividerContainer}>
          <Divider sx={{ flex: '1' }} />
        </Box>
        <Box sx={styles.actionsContainer}>
          <Button variant="contained" onClick={() => navigate('/add-location')}>
            Adicionar Local
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">CEP</TableCell>
                <TableCell align="center">Empresa</TableCell>
                <TableCell align="center">Responsável</TableCell>
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
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.cep}</TableCell>
                  <TableCell align="center">{row.companyName}</TableCell>
                  <TableCell align="center">{row.responsibleName}</TableCell>
                  <TableCell align="center">
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <Button onClick={async () => await handleDelete(row.id)}><DeleteForeverIcon /></Button>
                    <Button onClick={() => navigate(`/edit-location/${row.id}`)}><EditIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default LocationList
