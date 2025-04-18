import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import SearchBar from '../SearchBar';

test('вызывает onSearch через debounce', () => {
  jest.useFakeTimers(); 
  const onSearch = jest.fn(); 

  render(<SearchBar onSearch={onSearch} />);

  fireEvent.change(screen.getByPlaceholderText(/поиск/i), {
    target: { value: 'batman' },
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(onSearch).toHaveBeenCalledWith('batman');

  jest.useRealTimers(); 
});