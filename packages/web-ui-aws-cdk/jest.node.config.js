const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
}
module.exports = config
