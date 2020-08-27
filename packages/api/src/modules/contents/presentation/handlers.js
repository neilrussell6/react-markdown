const { map, path, assoc } = require('ramda')

const { ok, unknownError } = require('../../../common/http-response')
const DbUtils = require('../persistence/db.utils')
const { pickContentResponseKeys } = require('./response.utils')
const { MODULE_CONTEXT } = require('./constants')
const { loadMarkdown } = require('../business/markdown.utils')

// ------------------------------------
// get contents
// ------------------------------------

const getContents = ({ DB }) => ({ Logger }) => {
  const dbFindAllContent = DbUtils.findAllContent({ Logger, DB })
  const context = assoc('function', 'presentation.handlers.getContent', MODULE_CONTEXT)

  return async event => {
    Logger.info('REQUEST', event, context)

    try {
      // ... retrieve all content
      const content = await dbFindAllContent()
      Logger.debug('database content', content, context)

      // ... transform content for response
      const data = map(pickContentResponseKeys)(content)
      Logger.debug('transformed content', content, context)

      // .. build response
      const response = ok(data)
      Logger.info('RESPONSE', response, context)

      return response
    } catch (e) {
      Logger.error('UNKNOWN ERROR', e, context)
      return unknownError({ message: e.message })
    }
  }
}

module.exports.getContents = getContents

// ------------------------------------
// get content by id
// ------------------------------------

const getContent = ({ DB }) => ({ Logger }) => {
  const dbFindContent = DbUtils.findContent({ Logger, DB })
  const context = assoc('function', 'presentation.handlers.getContent', MODULE_CONTEXT)

  return async event => {
    try {
      Logger.info('REQUEST', event, context)

      const id = path(['pathParameters', 'id'])(event)
      const content = await dbFindContent(id)
      const data = pickContentResponseKeys(content)

      // ... load markdown
      const { markdown } = data
      const markdownContent = await loadMarkdown(markdown)

      // .. build response
      const response = ok(assoc('markdownContent', markdownContent, data))
      Logger.info('RESPONSE', response, context)

      return response
    } catch (e) {
      console.log(e)
      return unknownError({ message: e.message })
    }
  }
}

module.exports.getContent = getContent
