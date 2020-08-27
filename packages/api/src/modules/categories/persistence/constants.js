const { PGP } = require('../../../common/postgres')

const CATEGORY_DB_KEY_MAP = {}
const CATEGORY_DB_KEYS = ['id', 'label']
const CATEGORY_TABLE = 'categories'
const CATEGORY_COLUMN_SET = new PGP.helpers.ColumnSet(CATEGORY_DB_KEYS, { table: CATEGORY_TABLE })
const MODULE_CONTEXT = {
  package: 'markdown-api',
  module: 'categories',
}

module.exports = {
  ERROR_MESSAGE_NOT_FOUND_CATEGORY: 'could not find category',
  CATEGORY_DB_KEY_MAP,
  CATEGORY_DB_KEYS,
  CATEGORY_TABLE,
  CATEGORY_COLUMN_SET,
  MODULE_CONTEXT,
}
