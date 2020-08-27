const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*[!ui].test.js'],
}

// eslint-disable-next-line no-undef
module.exports = config
