import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
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
import { userSelector, clearState, signUp } from './userSlice'

const SignUp: React.FC = () => {
  const { isSuccess, isError, message } = useAppSelector(userSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const initialState = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  const handleSignUp = (): void => {
    const { email, password, passwordConfirmation } = values

    if (email.length === 0 || password.length === 0 || passwordConfirmation?.length === 0) {
      alert('Todos os campos são obrigatórios!')
      return
    }

    if (password !== passwordConfirmation) {
      alert('As senhas devem ser iguais!')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(signUp({ email, password }))
  }

  const { onChange, onSubmit, values } = useForm(handleSignUp, initialState)

  useEffect(() => {
    if (isSuccess) {
      alert('Cadastro efetuado com sucesso!')
      navigate('/')
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
                value={values.passwordConfirmation!}
              />
              <Box sx={styles.actionsContainer}>
                <Link component={RouterLink} to="/">
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
