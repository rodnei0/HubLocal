import React from 'react'
import { Typography, AppBar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

const TopBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0, bgcolor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <HomeIcon onClick={() => { navigate('/home') }} sx={{ color: 'black', width: '30px' }}></HomeIcon>
      <Typography variant='h6' color='black'>
        HubLocal
      </Typography>
      <LogoutIcon onClick={() => { navigate('/') }} sx={{ color: 'black', width: '30px' }}></LogoutIcon>
    </AppBar>
  )
}

export default TopBar
