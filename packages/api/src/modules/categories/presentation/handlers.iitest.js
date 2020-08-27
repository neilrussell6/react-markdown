const { map } = require('ramda')

const { DEFAULT_HEADERS } = require('../../../common/http-response')
const { PGP } = require('../../../common/postgres')
const { txit } = require('../../../common/test')
const factory = require('../data/factories')
const { CATEGORY_COLUMN_SET } = require('../persistence/constants')
const { mapCategoryToDB } = require('../persistence/data-mapping.utils')
const SUT = require('./handlers')

// ------------------------------------
// tests
// ------------------------------------

describe('modules/categories/presentation/handlers', () => {
  const envs = process.env

  beforeEach(() => {
    // envs
    jest.resetModules() // clear jest cache
    process.env = { ...envs }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    process.env = envs
  })

  describe('getCategory', () => {
    txit('should return all categories', async DB => {
      // given
      // ... 3 categories
      const categories = await factory.buildMany('Category', 3)
      const data = map(mapCategoryToDB)(categories)
      const createCategory = await PGP.helpers.insert(data, CATEGORY_COLUMN_SET)
      await DB.any(createCategory)

      // ... and logger will behave as expected
      const LoggerStub = { info: jest.fn(), debug: jest.fn() }

      // when ... we get all categories
      const localDeps = { DB }
      const externalDeps = { Logger: LoggerStub }
      const event = {
        headers: DEFAULT_HEADERS,
      }
      const response = await SUT.getCategories(localDeps)(externalDeps)(event)

      // then ... should succeed, returning both categories
      expect(response.statusCode).toBe(200)
      expect(response.headers).toEqual(DEFAULT_HEADERS)
      expect(typeof response.body === 'string').toBe(true)
      const body = JSON.parse(response.body)
      expect(body.data.length).toBe(3)
    })
  })
})
