module.exports = {
  preset: 'ts-jest', // Для поддержки TypeScript
  testEnvironment: 'jsdom', // Для тестирования React-компонентов
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Трансформация TypeScript и JSX через ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'], // Поддерживаемые расширения
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Указываем расширения для ESM
  setupFilesAfterEnv : ["<rootDir>/src/setupTests.ts"],
};
