import * as SUT from './postgres.utils'

describe('utils/postgres.utils', () => {
  describe('buildPostgresDatabaseURL', () => {
    it('should build database from provided data as expected', () => {
      const data = {
        PG_USER: 'USER',
        PG_PASSWORD: 'PASSWORD',
        PG_DATABASE: 'DATABASE',
        PG_PORT: 'PORT',
        PG_HOST: 'HOST',
      }
      const result = SUT.buildPostgresDatabaseURL(data)
      const expected = 'postgres://USER:PASSWORD@HOST:PORT/DATABASE'
      expect(result).toEqual(expected)
    })
  })
})
