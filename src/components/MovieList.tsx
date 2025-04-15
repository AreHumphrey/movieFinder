import React from 'react'
import { Link } from 'react-router-dom'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

interface Props {
  movies: Movie[]
}

const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <span>⭐ {movie.vote_average}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MovieList

export {} 