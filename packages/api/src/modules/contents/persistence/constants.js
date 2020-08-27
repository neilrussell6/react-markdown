const { PGP } = require('../../../common/postgres')

const CONTENT_DB_KEY_MAP = {
  category_id: 'categoryId',
}
const CONTENT_DB_KEYS = ['id', 'category_id', 'label', 'markdown']
const CONTENT_TABLE = 'contents'
const CONTENT_COLUMN_SET = new PGP.helpers.ColumnSet(CONTENT_DB_KEYS, { table: CONTENT_TABLE })
const MODULE_CONTEXT = {
  package: 'markdown-api',
  module: 'contents',
}

module.exports = {
  ERROR_MESSAGE_NOT_FOUND_CONTENT: 'could not find content',
  CONTENT_DB_KEY_MAP,
  CONTENT_DB_KEYS,
  CONTENT_TABLE,
  CONTENT_COLUMN_SET,
  MODULE_CONTEXT,
}
