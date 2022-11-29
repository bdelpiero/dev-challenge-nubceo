import { Box, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { UserForm } from '../components/UserForm'

export function Login() {
  const { login, loading, loginError } = useAuth()
  return (
    <UserForm title={'Login'} authAction={login} error={loginError} loading={loading}>
      <Box w="full" textAlign={'center'}>
        New to us?{' '}
        <Link as={RouterLink} color="teal.500" to="/signup">
          Sign Up
        </Link>
      </Box>
    </UserForm>
  )
}
