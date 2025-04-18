import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Импортируем act
import SearchBar from '../SearchBar';

test('вызывает onSearch через debounce', () => {
  jest.useFakeTimers(); // Включаем фейковые таймеры
  const onSearch = jest.fn(); // Создаем моковую функцию

  render(<SearchBar onSearch={onSearch} />);

  // Имитируем ввод текста в поле поиска
  fireEvent.change(screen.getByPlaceholderText(/поиск/i), {
    target: { value: 'batman' },
  });

  // Продвигаем таймеры вперед на 500 мс внутри act(...)
  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Проверяем, что onSearch был вызван с правильным значением
  expect(onSearch).toHaveBeenCalledWith('batman');

  jest.useRealTimers(); // Возвращаем реальные таймеры
});