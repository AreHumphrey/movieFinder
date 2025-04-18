import { render, screen } from '@testing-library/react'
import RandomMovie from '../RandomMovie'

const movie = {
  imdbID: 'tt123456',
  Title: 'Mocked Random',
  Year: '2020',
  Poster: '',
}

test('отображает случайный фильм', () => {
  render(<RandomMovie movie={movie} />)
  expect(screen.getByText(/Mocked Random/)).toBeInTheDocument()
})
