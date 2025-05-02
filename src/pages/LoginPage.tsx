import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: авторизация
    console.log({ email, password })
    navigate('/')
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
