const { map, assoc } = require('ramda')

const { ok, unknownError } = require('../../../common/http-response')
const DbUtils = require('../persistence/db.utils')
const { pickCategoryResponseKeys } = require('./response.utils')
const { MODULE_CONTEXT } = require('./constants')

// ------------------------------------
// get categories
// ------------------------------------

const getCategories = ({ DB }) => ({ Logger }) => {
  const dbFindAllCategories = DbUtils.findAllCategories({ Logger, DB })
  const context = assoc('function', 'presentation.handlers.getCategories', MODULE_CONTEXT)

  return async event => {
    Logger.info('REQUEST', event, context)

    try {
      // ... retrieve all categories
      const categories = await dbFindAllCategories()
      Logger.debug('database categories', categories, context)

      // ... transform categories for response
      const data = map(pickCategoryResponseKeys)(categories)
      Logger.debug('transformed categories', categories, context)

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

module.exports.getCategories = getCategories
