import React from 'react'
import { Link } from 'react-router-dom'
import { useGetPopularMoviesQuery } from '../features/api/omdbApi'

const MovieList: React.FC = () => {
  const { data, isLoading, isError } = useGetPopularMoviesQuery(1)
  const movies = data?.Search || []

  if (isLoading) return <p>Загрузка фильмов...</p>
  if (isError) return <p>Ошибка при загрузке фильмов</p>
  if (!movies.length) return <p>Фильмы не найдены</p>

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
            alt={movie.Title}
          />
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MovieList
