import React from 'react'
import { useParams } from 'react-router-dom'
import { moviesMock } from '../mocks/moviesMock'

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const movie = moviesMock.find((m) => m.id === Number(id))

  if (!movie) return <p>Фильм не найден</p>

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p><strong>Дата релиза:</strong> {movie.release_date}</p>
      <p><strong>Рейтинг:</strong> {movie.vote_average}</p>
      <p><strong>Описание:</strong> {movie.overview}</p>
      <h3>Актёры:</h3>
      <ul>
        {movie.credits?.cast.map((actor) => (
          <li key={actor.id}>
            {actor.name} — {actor.character}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieDetailsPage

export {} 
