import { Box, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { UserForm } from '../components/UserForm'
import { useAuth } from '../hooks/useAuth'

export function SignUp() {
  const { signUp, loading, signUpError } = useAuth()
  return (
    <UserForm title={'Sign Up'} authAction={signUp} error={signUpError} loading={loading}>
      <Box w="full" textAlign={'center'}>
        Already have an account?{' '}
        <Link as={RouterLink} color="teal.500" to="/login">
          Login
        </Link>
      </Box>
    </UserForm>
  )
}
