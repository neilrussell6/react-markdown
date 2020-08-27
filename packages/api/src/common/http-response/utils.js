const { mergeRight } = require('ramda')

const { DEFAULT_HEADERS } = require('./constants')

// ------------------------------------
// build response
// ------------------------------------

const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify(body),
})

module.exports.buildResponse = buildResponse

// ------------------------------------
// build error response
// ------------------------------------

module.exports.buildErrorResponse = defaultConfig => config => {
  const { statusCode, key, message } = mergeRight(defaultConfig, config)
  return buildResponse(statusCode, { error: { key, message } })
}

// ------------------------------------
// build no content response
// ------------------------------------

module.exports.buildNoContentResponse = () => ({
  statusCode: 204,
  headers: DEFAULT_HEADERS,
})
