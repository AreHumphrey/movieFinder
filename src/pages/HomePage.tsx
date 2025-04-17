// ✅ src/pages/HomePage.tsx (с поиском, случайным фильмом, шапкой и подвалом + пагинация)
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import RandomMovie from '../components/RandomMovie'
import { useSearchMoviesQuery, useGetPopularMoviesQuery } from '../features/api/omdbApi'

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState<any[]>([])

  const isSearching = query.trim() !== ''

  const { data: searchData, isLoading: isSearchingLoading } = useSearchMoviesQuery(
    { term: query, page },
    { skip: !isSearching }
  )

  const { data: popularData, isLoading: isPopularLoading } = useGetPopularMoviesQuery(page, {
    skip: isSearching,
  })

  const randomMovie = useMemo(() => {
    const sourceList = isSearching && searchData?.Response === 'True'
      ? searchData.Search || []
      : popularData?.Response === 'True'
        ? popularData.Search || []
        : []

    if (!sourceList.length) return null
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const index = parseInt(today, 10) % sourceList.length
    return sourceList[index]
  }, [isSearching, searchData, popularData])

  useEffect(() => {
    const data = isSearching ? searchData : popularData
    if (data?.Response === 'True' && data.Search) {
      setMovies((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]))
    }
  }, [searchData, popularData, isSearching, page])

  const handleLoadMore = () => setPage((prev) => prev + 1)

  return (
    <>

        <Header />

      <div className="container">
        {randomMovie && <RandomMovie movie={randomMovie} />}

        <SearchBar
          onSearch={(q) => {
            setQuery(q)
            setPage(1)
            setMovies([])
          }}
        />

        {(isSearchingLoading || isPopularLoading) && <p className="loading">Загрузка фильмов...</p>}
        {!movies.length && !(isSearchingLoading || isPopularLoading) && (
          <p className="error">Фильмы не найдены</p>
        )}

        <div className="movie-grid">
          {movies
            .filter((m) => m.imdbID !== randomMovie?.imdbID)
            .map((movie) => (
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

        {!!movies.length && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={handleLoadMore} className="load-more-btn">
              Показать ещё
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default HomePage

export {}