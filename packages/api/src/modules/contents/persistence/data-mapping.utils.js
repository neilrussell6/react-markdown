const { invert, pick } = require('ramda')

const { renameKeys } = require('../../../common/ramda.utils')
const { CONTENT_DB_KEY_MAP, CONTENT_DB_KEYS } = require('./constants')

// ------------------------------------
// map content to/from db
// ------------------------------------

module.exports.mapContentToDB = renameKeys(invert(CONTENT_DB_KEY_MAP))
module.exports.mapContentFromDB = renameKeys(CONTENT_DB_KEY_MAP)
module.exports.pickContentDBKeys = pick(CONTENT_DB_KEYS)
