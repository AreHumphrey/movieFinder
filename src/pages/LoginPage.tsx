import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import { login } from '../api/backend' // подключение API

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await login(email, password)
      const token = res.data.token
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      setError('Неверный email или пароль')
    }
  }

  return (
    <>
      <Header />
      <div className="container auth-page">
        <h1 className="auth-title">Авторизация</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button full-width">
            Войти
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="text-center auth-note">
          <span className="note-black">Нет аккаунта?</span>{' '}
          <Link to="/register" className="note-orange">Зарегистрироваться</Link>
        </p>
      </div>
    </>
  )
}

export default LoginPage
