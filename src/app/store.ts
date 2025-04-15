import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from '../features/api/tmdbApi'
import moviesReducer from '../features/api/moviesSlice'

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export {} 