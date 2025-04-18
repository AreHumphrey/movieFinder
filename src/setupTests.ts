import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Запуск и остановка MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
