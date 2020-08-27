const { pluck } = require('ramda')

const { PGP } = require('../../../common/postgres')
const { txit } = require('../../../common/test')
const factory = require('../data/factories')
const { CATEGORY_COLUMN_SET } = require('./constants')
const SUT = require('./db.utils')

// ------------------------------------
// tests
// ------------------------------------

describe('modules/categories/persistence/db.utils', () => {
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

  describe('findAllCategory', () => {
    txit('should return all categories', async DB => {
      // given ... 3 categories
      const categories = await factory.buildMany('Category', 3)
      const createCategoryQuery = await PGP.helpers.insert(categories, CATEGORY_COLUMN_SET)
      await DB.any(createCategoryQuery)

      // when ... we find all categories
      // then ... should return all categories
      const result = await SUT.findAllCategories({ DB })()
      const ids = pluck('id', result)
      expect(result.length).toEqual(3)
      expect(ids).toEqual([categories[0].id, categories[1].id, categories[2].id])
    })
  })
})
