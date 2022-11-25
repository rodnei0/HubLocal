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
    const { email, password } = values

    if (email.length === 0 || password.length === 0) {
      alert('Todos os campos são obrigatórios!')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(signIn({ email, password }))
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, values } = useForm(handleSignIn, initialState)

  useEffect(() => {
    if (isSuccess) {
      alert('Login efetuado com sucesso!')
      navigate('/companies')
    }

    if (isError) {
      alert(message)
    }
    dispatch(clearState())
  }, [isSuccess, isError])

  return (
    <>
      <Container sx={{ height: '100vh' }} disableGutters={true}>
        <Container component={'main'} sx={{ height: '100%', display: 'flex' }}>
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
                value={values.email}
              />
              <PasswordInput
                name="password"
                sx={styles.input}
                label="Senha"
                onChange={onChange}
                value={values.password}
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
      </Container>
    </>
  )
}

export default SignIn
