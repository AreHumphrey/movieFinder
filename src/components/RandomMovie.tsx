import React from 'react'
import { Link } from 'react-router-dom'

// ✅ Интерфейс Movie должен соответствовать данным OMDb API
interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
}

interface Props {
  movie: Movie
}

const RandomMovie: React.FC<Props> = ({ movie }) => {
  return (
    <div className="random-movie">
      <h2>🎬 Случайный фильм дня</h2>
      <div className="random-movie-card">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
          alt={movie.Title}
        />
        <div>
          <h3>{movie.Title}</h3>
          <p>Год: {movie.Year}</p>
          <Link to={`/movie/${movie.imdbID}`} className="random-movie-btn">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RandomMovie

export {}
