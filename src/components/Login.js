import React, { useState } from 'react'
import loginServices from '../services/login'
import blogServices from '../services/blogs'
import Notification from './Notification'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      onLogin(user)
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response.status === 500) {
        setErrorMessage('Could not connect to server.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setUsername('')
        setPassword('')
        return
      }

      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} isError={true} />
      <form onSubmit={handleOnSubmit}>
        <div>
          username{' '}
          <input
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            type="text"
            name="Username"
            value={username}
            data-cy="username"
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            value={password}
            data-cy="password"
          />
        </div>
        <button type="submit" data-cy="login-button">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
