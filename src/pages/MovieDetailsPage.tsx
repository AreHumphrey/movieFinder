// ✅ src/pages/MovieDetailsPage.tsx (получение данных с OMDb API и улучшенный дизайн)
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../features/api/omdbApi'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError } = useGetMovieByIdQuery(id || '')

  // Проверка на отсутствие обязательных полей
  const isMovieInvalid = !movie || !movie.Title || movie.Title === 'N/A'

  return (
    <>
      <Header />
      {isLoading ? (
        <p className="loading">Загрузка информации о фильме...</p>
      ) : isError || isMovieInvalid ? (
        <p className="error">Фильм не найден</p>
      ) : (
        <div className="movie-details-container">
          <h1 className="movie-title">{movie.Title}</h1>
          <div className="movie-details-wrapper">
            <img
              className="movie-poster"
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
              alt={movie.Title}
            />
            <div className="movie-info-text">
              <p><strong>Год:</strong> {movie.Year}</p>
              <p><strong>Рейтинг IMDb:</strong> {movie.imdbRating}</p>
              <p><strong>Жанр:</strong> {movie.Genre}</p>
              <p><strong>Режиссёр:</strong> {movie.Director}</p>
              <p><strong>Актёры:</strong> {movie.Actors}</p>
              <p><strong>Описание:</strong> {movie.Plot}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default MovieDetailsPage

export {}
