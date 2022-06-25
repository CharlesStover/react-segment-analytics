export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: ['json', 'lcov', ['text', { skipFull: true }], 'clover'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^.+\\.tsx?$': 'babel-jest',

    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@segment': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@segment/analytics-next/dist/pkg/)',
  ],
};
