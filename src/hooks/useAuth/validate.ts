import { hash } from '../../helpers'
import { User, Users } from './types'

// TODO: move error messages to constant
export const validateLogin = (users: Users, user: User) => {
  if (!user) throw new Error('No user provided')
  if (!users || !users[user.email])
    throw new Error('This E-mail address does not exist on our database')
  if (users[user.email] !== hash(user.password)) throw new Error('Password is incorrect')
}

// basic email validation.
// expects a character before the @ and something before and after the dot in the domain part
const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email)

// basic password validation.
// we are simply validating that the password is between 6 an 18 characters
const isValidPassword = (password: string) => password.length >= 6 && password.length <= 18

export const validateSignUp = (users: Users, user: User) => {
  if (!user) throw new Error('No user provided')
  if (!isValidEmail(user.email)) throw new Error('Invalid e-mail')
  if (!isValidPassword(user.password))
    throw new Error('Your password must be between 6 and 18 characters long')
  if (users && users[user.email])
    throw new Error('A user with this email is already registered in our site')
}
