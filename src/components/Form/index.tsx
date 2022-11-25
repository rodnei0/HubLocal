import React from 'react'
import { Box } from '@mui/system'

const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}

interface Props {
  children: React.ReactNode
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const Form2: React.FC<Props> = ({ children, onSubmit }) => {
  return (
    <Box sx={styles} component="form" onSubmit={onSubmit}>
      {children}
    </Box>
  )
}

export default Form2
