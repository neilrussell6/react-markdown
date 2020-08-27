const { invert, pick } = require('ramda')

const { renameKeys } = require('../../../common/ramda.utils')
const { CATEGORY_DB_KEY_MAP, CATEGORY_DB_KEYS } = require('./constants')

// ------------------------------------
// map category to/from db
// ------------------------------------

module.exports.mapCategoryToDB = renameKeys(invert(CATEGORY_DB_KEY_MAP))
module.exports.mapCategoryFromDB = renameKeys(CATEGORY_DB_KEY_MAP)
module.exports.pickCategoryDBKeys = pick(CATEGORY_DB_KEYS)
