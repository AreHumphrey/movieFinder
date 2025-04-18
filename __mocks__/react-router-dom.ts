// __mocks__/react-router-dom.ts

import React from 'react';

module.exports = {
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn(),
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Link: ({ to, children }) => React.createElement('a', { href: to }, children),
};