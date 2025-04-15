// src/pages/HomePage.tsx
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import { moviesMock } from '../mocks/moviesMock'

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? moviesMock.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : moviesMock

  return (
    <div className="container">
      <SearchBar onSearch={setQuery} />
      <MovieList movies={filtered} />
    </div>
  )
}

export default HomePage

export {} 