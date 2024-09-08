/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
