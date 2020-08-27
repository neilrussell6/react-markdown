const { buildErrorResponse, buildNoContentResponse, buildResponse } = require('./utils')
const { DEFAULT_HEADERS, ERROR_CONFIG_INVALID, ERROR_CONFIG_NOT_FOUND, ERROR_CONFIG_UNKNOWN } = require('./constants')

module.exports.DEFAULT_HEADERS = DEFAULT_HEADERS

// ------------------------------------
// success responses
// ------------------------------------

module.exports.ok = data => buildResponse(200, { data })
module.exports.created = data => buildResponse(201, { data })
module.exports.updated = data => buildResponse(200, { data })
module.exports.accepted = data => buildResponse(202, { data })
module.exports.deleted = () => buildNoContentResponse()
module.exports.noContent = () => buildNoContentResponse()

// ------------------------------------
// 4xx error responses
// ------------------------------------

module.exports.invalid = buildErrorResponse(ERROR_CONFIG_INVALID)
module.exports.notFound = buildErrorResponse(ERROR_CONFIG_NOT_FOUND)

// ------------------------------------
// 5xx error responses
// ------------------------------------

module.exports.unknownError = buildErrorResponse(ERROR_CONFIG_UNKNOWN)
