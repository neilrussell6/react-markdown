const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.iitest.js'],
}

module.exports = config
