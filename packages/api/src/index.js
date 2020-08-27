const { DEFAULT_HEADERS } = require('./common/http-response/constants')
const { getContents, getContent } = require('./modules/contents')
const { getCategories } = require('./modules/categories')

// ------------------------------------
// root handler
// ------------------------------------

module.exports.any = async () => ({
  statusCode: 200,
  headers: DEFAULT_HEADERS,
  body: null,
})

// ------------------------------------
// handlers
// ------------------------------------

const deps = { Logger: console }
module.exports.getContents = getContents(deps)
module.exports.getContent = getContent(deps)
module.exports.getCategories = getCategories(deps)
