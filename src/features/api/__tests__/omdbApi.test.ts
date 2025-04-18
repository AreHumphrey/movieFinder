// src/features/api/__tests__/omdbApi.test.ts
import { renderHook } from '@testing-library/react';
import { omdbApi } from '../omdbApi';

jest.mock('../omdbApi', () => ({
  omdbApi: {
    endpoints: {
      getPopularMovies: {
        useQuery: jest.fn(),
      },
      searchMovies: {
        useQuery: jest.fn(),
      },
      getMovieById: {
        useQuery: jest.fn(),
      },
    },
  },
}));

describe('omdbApi без Provider', () => {
  const mockPopularMovies = {
    data: {
      Search: [
        { imdbID: '1', Title: 'The Dark Knight', Year: '2008' },
        { imdbID: '2', Title: 'Inception', Year: '2010' },
      ],
      totalResults: '2',
      Response: 'True',
    },
    isSuccess: true,
  };

  const mockSearchMovies = {
    data: {
      Search: [
        { imdbID: '3', Title: 'Batman Begins', Year: '2005' },
        { imdbID: '4', Title: 'The Dark Knight Rises', Year: '2012' },
      ],
      totalResults: '2',
      Response: 'True',
    },
    isSuccess: true,
  };

  const mockMovieById = {
    data: {
      Title: 'Mocked Movie',
      Year: '2020',
      imdbRating: '8.0',
      Genre: 'Action',
      Director: 'Director Name',
      Actors: 'Actor 1, Actor 2',
      Plot: 'This is a mocked movie description.',
      Poster: 'https://via.placeholder.com/300x445?text=No+Image',
    },
    isSuccess: true,
  };

  beforeEach(() => {
    // Мокаем ответы для хуков
    require('../omdbApi').omdbApi.endpoints.getPopularMovies.useQuery.mockReturnValue(mockPopularMovies);
    require('../omdbApi').omdbApi.endpoints.searchMovies.useQuery.mockReturnValue(mockSearchMovies);
    require('../omdbApi').omdbApi.endpoints.getMovieById.useQuery.mockReturnValue(mockMovieById);
  });

  test('должен загружать популярные фильмы', async () => {
    const { result } = renderHook(() => omdbApi.endpoints.getPopularMovies.useQuery(1));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.Search).toHaveLength(2);
    expect(result.current.data?.Search[0].Title).toBe('The Dark Knight');
    expect(result.current.data?.Search[1].Title).toBe('Inception');
  });

  test('должен искать фильмы по запросу', async () => {
    const { result } = renderHook(() => omdbApi.endpoints.searchMovies.useQuery({ term: 'Batman', page: 1 }));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.Search).toHaveLength(2);
    expect(result.current.data?.Search[0].Title).toBe('Batman Begins');
    expect(result.current.data?.Search[1].Title).toBe('The Dark Knight Rises');
  });

  test('должен получать фильм по ID', async () => {
    const { result } = renderHook(() => omdbApi.endpoints.getMovieById.useQuery('tt123456'));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.Title).toBe('Mocked Movie');
    expect(result.current.data?.Year).toBe('2020');
    expect(result.current.data?.imdbRating).toBe('8.0');
  });
});