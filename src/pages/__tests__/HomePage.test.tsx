import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from '../HomePage';
import '@testing-library/jest-dom';
import moviesReducer from '../../features/api/moviesSlice';

jest.mock('../../features/api/omdbApi', () => ({
  omdbApi: {
    reducerPath: 'omdbApi', // Замокаем reducerPath
    reducer: jest.fn(() => ({})), // Редюсер возвращает пустой объект
    middleware: jest.fn(() => (next: any) => (action: any) => next(action)), // Мок мидлвары
  },
  useSearchMoviesQuery: jest.fn(),
  useGetPopularMoviesQuery: jest.fn(),
}));

const mockMovies = [
  { imdbID: '1', Title: 'The Dark Knight', Year: '2008', Poster: 'https://example.com/dark-knight.jpg' },
  { imdbID: '2', Title: 'Inception', Year: '2010', Poster: 'https://example.com/inception.jpg' },
];

test('HomePage загружает фильмы', async () => {
  // Мокаем данные для useGetPopularMoviesQuery
  const mockUseGetPopularMoviesQuery = jest.fn(() => ({
    data: { Response: 'True', Search: mockMovies },
    isLoading: false,
  }));

  // Мокаем данные для useSearchMoviesQuery
  const mockUseSearchMoviesQuery = jest.fn(() => ({
    data: { Response: 'True', Search: mockMovies },
    isLoading: false,
  }));

  // Применяем моки
  require('../../features/api/omdbApi').useGetPopularMoviesQuery.mockImplementation(mockUseGetPopularMoviesQuery);
  require('../../features/api/omdbApi').useSearchMoviesQuery.mockImplementation(mockUseSearchMoviesQuery);

  const store = configureStore({
    reducer: {
      [require('../../features/api/omdbApi').omdbApi.reducerPath]: require('../../features/api/omdbApi').omdbApi.reducer,
      movies: moviesReducer || (() => ({})), // Убедитесь, что moviesReducer существует
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(require('../../features/api/omdbApi').omdbApi.middleware),
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );

  // Ждём, пока текст "Случайный фильм дня" появится в DOM
  await waitFor(() => {
    expect(screen.getByText(/Случайный фильм дня/i)).toBeInTheDocument();
  });

  // Проверяем, что фильмы загружены
  expect(screen.getByText(/The Dark Knight/i)).toBeInTheDocument();
  expect(screen.getByText(/Inception/i)).toBeInTheDocument();
});