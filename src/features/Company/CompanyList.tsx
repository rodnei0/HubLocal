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
import { clearState, companySelector, getCompanies, deleteCompany } from './companySlice'
import styles from './styles'
import TopBar from '../../components/TopBar'

interface CompanyDataList {
  id: number
  name: string
  cnpj: string
  description: string
  responsibleName: string
}

const CompanyList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { companyList } = useAppSelector(companySelector)
  const rows: CompanyDataList[] = []
  const navigate = useNavigate()
  const [updateList, setUpdateList] = useState(false)

  if (companyList.length !== 0) {
    companyList.forEach(company => {
      rows.push({
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
        description: company.description,
        responsibleName: company.responsibles[0].name
      })
    })
  }

  const handleDelete = async (id: number): Promise<void> => {
    const result = confirm('Tem certeza que deseja deletar esta empresa?')
    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(deleteCompany(id))
      setUpdateList(true)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getCompaniesList = async () => {
      await dispatch(getCompanies())
      dispatch(clearState())
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCompaniesList()
  }, [updateList])

  return (
    <>
      <TopBar />
      <Container component={'main'} sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Lista de Empresas
        </Typography>
        <Box sx={styles.dividerContainer}>
          <Divider sx={{ flex: '1' }} />
        </Box>
        <Box sx={styles.actionsContainer}>
          <Button variant="contained" onClick={() => navigate('/add-company')}>
            Adicionar Empresa
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">CNPJ</TableCell>
                <TableCell align="center">Descrição</TableCell>
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
                  <TableCell align="center">{row.cnpj}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.responsibleName}</TableCell>
                  <TableCell align="center">
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <Button onClick={async () => await handleDelete(row.id)}><DeleteForeverIcon /></Button>
                    <Button onClick={() => navigate(`/edit-company/${row.id}`)}><EditIcon /></Button>
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

export default CompanyList
