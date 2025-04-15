// src/features/movies/moviesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MoviesState {
  currentPage: number
  searchQuery: string
}

const initialState: MoviesState = {
  currentPage: 1,
  searchQuery: '',
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
  },
})

export const { setPage, setSearchQuery } = moviesSlice.actions
export default moviesSlice.reducer
export {} 