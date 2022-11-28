import React, { useEffect } from 'react'
import {
  Container,
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import Form from '../../components/Form'
import PasswordInput from '../../components/PasswordInput'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearState, signIn, userSelector } from './userSlice'

const SignIn: React.FC = () => {
  const { isSuccess, isError, message } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialState = {
    email: '',
    password: ''
  }

  const handleSignIn = async (): Promise<void> => {
    const { email, password } = formData

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(signIn({ email, password }))
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, formData } = useForm(handleSignIn, initialState)

  useEffect(() => {
    if (isSuccess) {
      alert('Login efetuado com sucesso!')
      navigate('/home')
    }

    if (isError) {
      alert(message)
    }
    dispatch(clearState())
  }, [isSuccess, isError])

  return (
    <>
      <Container component={'main'} sx={styles.container}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Form onSubmit={onSubmit}>
          <Box sx={styles.container}>
            <Typography sx={styles.title} variant="h4" component="h1">
              Login
            </Typography>
            <Box sx={styles.dividerContainer}>
              <Divider sx={{ flex: '1' }} />
            </Box>
            <TextField
              id="email"
              name="email"
              sx={styles.input}
              label="Email"
              type="email"
              variant="outlined"
              onChange={onChange}
              value={formData.email}
            />
            <PasswordInput
              name="password"
              sx={styles.input}
              label="Senha"
              onChange={onChange}
              value={formData.password}
            />
            <Box sx={styles.actionsContainer}>
              <Link component={RouterLink} to="/sign-up">
                <Typography>Não possuo cadastro</Typography>
              </Link>
              <Button id="signIn" variant="contained" type="submit">
                Entrar
              </Button>
            </Box>
          </Box>
        </Form>
      </Container>
    </>
  )
}

export default SignIn
