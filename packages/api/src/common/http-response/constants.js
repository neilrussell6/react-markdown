// ------------------------------------
// headers
// ------------------------------------

module.exports.DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

// ------------------------------------
// 4xx error messages
// ------------------------------------

module.exports.ERROR_CONFIG_INVALID = {
  statusCode: 400,
  key: 'Invalid request',
  message: 'Invalid request',
}

module.exports.ERROR_CONFIG_NOT_FOUND = {
  statusCode: 404,
  key: 'NotFound',
  message: 'Requested resource could not be found',
}

// ------------------------------------
// 5xx error messages
// ------------------------------------

module.exports.ERROR_CONFIG_UNKNOWN = {
  statusCode: 500,
  key: 'UnknownError',
  message: 'Internal Server Error',
}
