import { UserForm } from '../components/UserForm'
import { useAuth } from '../hooks/useAuth'

export function SignUp() {
  const { signUp, loading, signUpError } = useAuth()
  return <UserForm title={'Sign Up'} authAction={signUp} error={signUpError} loading={loading} />
}
