import React from 'react'
import {
  Box,
  Button,
  Container,
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
import api from '../../services/api'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const initialState = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  const handleSignUp = async (): Promise<void> => {
    if (((values?.email).length === 0) || ((values?.password).length === 0) || ((values?.passwordConfirmation).length === 0)) {
      alert('Todos os campos são obrigatórios!')
      return
    }

    const { email, password, passwordConfirmation } = values

    if (password !== passwordConfirmation) {
      alert('As senhas devem ser iguais!')
      return
    }

    try {
      await api.signUp({ email, password })
      alert('Cadastro efetuado com sucesso!')
      navigate('/sign-in')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data.message)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const { onChange, onSubmit, values } = useForm(handleSignUp, initialState)

  return (
    <>
      <Container sx={{ height: '100vh' }} disableGutters={true}>
        <Container component={'main'} sx={{ height: '100%', display: 'flex' }}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Form onSubmit={onSubmit}>
            <Box sx={styles.container}>
              <Typography sx={styles.title} variant="h4" component="h1">
                Cadastro
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
              <PasswordInput
                name="passwordConfirmation"
                sx={styles.input}
                label="Confirme sua senha"
                onChange={onChange}
                value={values.passwordConfirmation}
              />
              <Box sx={styles.actionsContainer}>
                <Link component={RouterLink} to="/sign-in">
                  <Typography>Já possuo cadastro</Typography>
                </Link>
                <Button id="signUp" variant="contained" type="submit">
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </Form>
        </Container>
      </Container>
    </>
  )
}

export default SignUp
