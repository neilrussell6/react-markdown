const { map } = require('ramda')
const axios = require('axios')

const { DEFAULT_HEADERS } = require('../../../common/http-response')
const { PGP } = require('../../../common/postgres')
const { txit } = require('../../../common/test')
const factory = require('../data/factories')
const { CONTENT_COLUMN_SET } = require('../persistence/constants')
const { mapContentToDB } = require('../persistence/data-mapping.utils')
const SUT = require('./handlers')

// ------------------------------------
// tests
// ------------------------------------

jest.mock('axios')

describe('modules/contents/presentation/handlers', () => {
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

  describe('getContents', () => {
    txit('should return all contents', async DB => {
      // given ... 3 contents
      const contents = await factory.buildMany('Content', 3)
      const data = map(mapContentToDB)(contents)
      const createContent = await PGP.helpers.insert(data, CONTENT_COLUMN_SET)
      await DB.any(createContent)

      // ... and logger will behave as expected
      const LoggerStub = { info: jest.fn(), debug: jest.fn() }

      // when ... we get all contents
      const localDeps = { DB }
      const externalDeps = { Logger: LoggerStub }
      const event = {
        headers: DEFAULT_HEADERS,
      }
      const response = await SUT.getContents(localDeps)(externalDeps)(event)

      // then
      // ... should succeed, returning both contents
      expect(response.statusCode).toBe(200)
      expect(response.headers).toEqual(DEFAULT_HEADERS)
      expect(typeof response.body === 'string').toBe(true)
      const body = JSON.parse(response.body)
      expect(body.data.length).toBe(3)
      expect(body.data[0]).toHaveProperty('markdown')
      expect(body.data[0]).not.toHaveProperty('markdownContent')
      expect(body.data[0].markdown).toEqual(contents[0].markdown)
      // ... not retrieving any markdown
      expect(axios.get).not.toHaveBeenCalled()
    })
  })

  describe('getContent', () => {
    txit('should return content matching provided id, including loaded markdown', async DB => {
      // given ... 3 contents
      const contents = await factory.buildMany('Content', 3)
      const createContentQuery = await PGP.helpers.insert(contents, CONTENT_COLUMN_SET)
      await DB.any(createContentQuery)

      // ... and logger will behave as expected
      const LoggerStub = { info: jest.fn(), debug: jest.fn() }

      // when ... we get content 2
      const localDeps = { DB }
      const externalDeps = { Logger: LoggerStub }
      const event = {
        headers: DEFAULT_HEADERS,
        pathParameters: { id: contents[0].id },
      }
      axios.get.mockResolvedValue({ data: 'MARKDOWN 2 CONTENT' })
      const response = await SUT.getContent(localDeps)(externalDeps)(event)

      // then
      // ... should succeed, returning content 2
      expect(response.statusCode).toBe(200)
      expect(response.headers).toEqual(DEFAULT_HEADERS)
      expect(typeof response.body === 'string').toBe(true)
      const body = JSON.parse(response.body)
      expect(body.data.id).toBe(contents[0].id)
      expect(body.data).toHaveProperty('markdown')
      expect(body.data).toHaveProperty('markdownContent')
      expect(body.data.markdown).toEqual(contents[0].markdown)
      expect(body.data.markdownContent).toEqual('MARKDOWN 2 CONTENT')
      // ... after correctly retrieving the markdown
      expect(axios.get).toHaveBeenCalledWith(contents[0].markdown)
    })
  })
})
