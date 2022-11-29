import React from 'react'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BusinessIcon from '@mui/icons-material/Business'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import TopBar from '../../components/TopBar'
import styles from './styles'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <TopBar />
      <Container sx={styles.container}>
        <Button sx={styles.button} variant="contained" startIcon={<BusinessIcon />} onClick={() => navigate('/company-list')}>EMPRESAS</Button>
        <Button sx={styles.button} variant="contained" startIcon={<LocationOnIcon />} onClick={() => navigate('/location-list')}>LOCAIS</Button>
        <Button sx={styles.button} variant="contained" startIcon={<LocalActivityIcon />} onClick={() => navigate('/ticket-list')}>TICKETS</Button>
      </Container>
    </>
  )
}

export default Home
