import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: регистрация
    console.log({ email, password })
    navigate('/login')
  }

  return (
    <>
      <Header />
      <div className="container auth-page">
        <h1 className="auth-title">Регистрация</h1>
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
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center auth-note">
          <span className="note-black">Уже есть аккаунт?</span>{' '}
          <Link to="/login" className="note-orange">Войти</Link>
        </p>
      </div>
    </>
  )
}

export default RegisterPage
