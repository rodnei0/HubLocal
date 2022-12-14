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
import Loader from '../../components/Loader'

interface CompanyDataList {
  id: number
  name: string
  cnpj: string
  description: string
  responsibleName: string
}

const CompanyList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { companyList, isFetching } = useAppSelector(companySelector)
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
      await dispatch(deleteCompany(id))
      setUpdateList(!updateList)
    }
  }

  useEffect(() => {
    const getCompaniesList = async (): Promise<void> => {
      await dispatch(getCompanies())
      dispatch(clearState())
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCompaniesList()
  }, [updateList])

  return (
    <>
      <TopBar />
      {isFetching
        ? <Loader />
        : (
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
            {companyList.length === 0
              ? (
                <Box sx={styles.subContainer}>
                  <Typography sx={styles.title} variant="h6" component="h2">
                    Ainda n??o foram criadas empresas! Adicione uma empresa clicando no bot??o acima.
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
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">CNPJ</TableCell>
                        <TableCell align="center">Descri????o</TableCell>
                        <TableCell align="center">Respons??vel</TableCell>
                        <TableCell align="center">A????es</TableCell>
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
                // eslint-disable-next-line @typescript-eslint/indent
              )}
          </Container>
          // eslint-disable-next-line @typescript-eslint/indent
        )}
    </>
  )
}

export default CompanyList
