import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactElement }) => element,
}));

test('renders App with mocked routing', () => {
  const mockId = '123'; 
  const history = createMemoryHistory();
  history.push(`/movie/${mockId}`);

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );

  expect(document.body).toBeInTheDocument();
});