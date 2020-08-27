const { pickAll } = require('../../../common/ramda.utils')
const { CATEGORY_RESPONSE_KEYS } = require('./constants')

// ------------------------------------
// pick category response keys
// ------------------------------------

module.exports.pickCategoryResponseKeys = pickAll(CATEGORY_RESPONSE_KEYS)
