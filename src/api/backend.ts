import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const register = (email: string, password: string) =>
  API.post('/register', { email, password })

export const login = (email: string, password: string) =>
  API.post('/login', { email, password })

export const getComments = (movieId: string) =>
  API.get(`/comments/${movieId}`)

export const addComment = (movieId: string, text: string, token: string) =>
  API.post(
    `/comments/${movieId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
