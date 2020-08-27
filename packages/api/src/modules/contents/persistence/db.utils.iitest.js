const { pluck } = require('ramda')

const { PGP } = require('../../../common/postgres')
const { txit } = require('../../../common/test')
const factory = require('../data/factories')
const { CONTENT_COLUMN_SET } = require('./constants')
const SUT = require('./db.utils')

// ------------------------------------
// tests
// ------------------------------------

describe('modules/contents/persistence/db.utils', () => {
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

  describe('findAllContent', () => {
    txit('should return all content', async DB => {
      // given ... 3 content
      const content = await factory.buildMany('Content', 3)
      const createContentQuery = await PGP.helpers.insert(content, CONTENT_COLUMN_SET)
      await DB.any(createContentQuery)

      // when ... we find all content
      // then ... should return all content
      const result = await SUT.findAllContent({ DB })()
      const ids = pluck('id', result)
      expect(result.length).toEqual(3)
      expect(ids).toEqual([content[0].id, content[1].id, content[2].id])
    })
  })

  describe('findContent', () => {
    txit('should return content matching provided id', async DB => {
      // given ... 3 content
      const content = await factory.buildMany('Content', 3)
      const createContentQuery = await PGP.helpers.insert(content, CONTENT_COLUMN_SET)
      await DB.any(createContentQuery)

      // when ... we find content 2 by id
      // then ... should return content 2
      const result = await SUT.findContent({ DB })(content[1].id)
      expect(result.id).toEqual(content[1].id)
    })
  })
})
