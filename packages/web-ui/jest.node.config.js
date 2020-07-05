const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*[!ui].test.js'],
}

module.exports = config
