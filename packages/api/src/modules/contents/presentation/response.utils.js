const { pickAll } = require('../../../common/ramda.utils')
const { CONTENT_RESPONSE_KEYS } = require('./constants')

// ------------------------------------
// pick content response keys
// ------------------------------------

module.exports.pickContentResponseKeys = pickAll(CONTENT_RESPONSE_KEYS)
