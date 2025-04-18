// src/components/__tests__/RandomMovie.test.tsx
import { render, screen } from '@testing-library/react';
import RandomMovie from '../RandomMovie';
import '@testing-library/jest-dom'; // Импортируем jest-dom

const movie = {
  imdbID: 'tt123456',
  Title: 'Mocked Random',
  Year: '2020',
  Poster: 'https://via.placeholder.com/300x445?text=No+Image', // Заменяем пустую строку на плейсхолдер
};

test('отображает случайный фильм', () => {
  render(<RandomMovie movie={movie} />);
  expect(screen.getByText(/Mocked Random/)).toBeInTheDocument();
});