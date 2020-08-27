const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.js'],
}

module.exports = config
