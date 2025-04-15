import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const TMDB_API_KEY = 'ТВОЙ_API_КЛЮЧ' 

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page = 1) => `movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
    }),
    searchMovies: builder.query({
      query: (query: string) => `search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
    }),
    getMovieDetails: builder.query({
      query: (id: number) => `movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`,
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
} = tmdbApi
export {} 