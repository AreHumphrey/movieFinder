import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Импортируем реальные экспорты
  Routes: ({ children }) => <div>{children}</div>, // Мокаем Routes
  Route: ({ element }) => element, // Мокаем Route
}));

test('renders App with mocked routing', () => {
  const mockId = '123'; // Пример ID фильма
  const history = createMemoryHistory();
  history.push(`/movie/${mockId}`);

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );

  // Проверяем, что компонент рендерится без ошибок
  expect(document.body).toBeInTheDocument();
});