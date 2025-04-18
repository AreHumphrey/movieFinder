
import { render, screen } from '@testing-library/react';
import RandomMovie from '../RandomMovie';
import '@testing-library/jest-dom'; 

const movie = {
  imdbID: 'tt123456',
  Title: 'Mocked Random',
  Year: '2020',
  Poster: 'https://via.placeholder.com/300x445?text=No+Image', 
};

test('отображает случайный фильм', () => {
  render(<RandomMovie movie={movie} />);
  expect(screen.getByText(/Mocked Random/)).toBeInTheDocument();
});