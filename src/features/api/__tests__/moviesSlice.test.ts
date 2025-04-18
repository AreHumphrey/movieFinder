import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, { setPage, setSearchQuery } from '../moviesSlice';

describe('moviesSlice', () => {
  test('должен инициализировать начальное состояние', () => {
    const store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });

    // Проверяем начальное состояние
    const state = store.getState().movies;
    expect(state.currentPage).toBe(1);
    expect(state.searchQuery).toBe('');
  });

  test('должен обновлять currentPage через setPage', () => {
    const store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });

    // Диспатчим действие setPage
    store.dispatch(setPage(2));

    // Проверяем новое состояние
    const state = store.getState().movies;
    expect(state.currentPage).toBe(2);
  });

  test('должен обновлять searchQuery через setSearchQuery', () => {
    const store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });

    // Диспатчим действие setSearchQuery
    store.dispatch(setSearchQuery('Batman'));

    // Проверяем новое состояние
    const state = store.getState().movies;
    expect(state.searchQuery).toBe('Batman');
  });
});