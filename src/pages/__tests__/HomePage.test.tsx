import { render, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import HomePage from '../HomePage'
import { omdbApi } from '../../features/api/omdbApi'
import moviesReducer from '../../features/api/moviesSlice'

test('HomePage загружает фильмы', async () => {
  const store = configureStore({
    reducer: {
      [omdbApi.reducerPath]: omdbApi.reducer,
      movies: moviesReducer,
    },
    middleware: (gDM) => gDM().concat(omdbApi.middleware),
  })

  render(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  )

  await waitFor(() => {
    expect(screen.getByText(/Случайный фильм дня/i)).toBeInTheDocument()
  })
})
