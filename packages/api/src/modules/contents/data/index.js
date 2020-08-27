const pg = require('pg-promise')
const path = require('path')

const sqlFile = filename => {
  const root = process.env.APP_ROOT_PATH || __dirname
  const filePath = path.join(root, 'sql', filename)
  return new pg.QueryFile(filePath, { minify: true })
}

module.exports = {
  sql: {
    contents: {
      createTable: sqlFile('create-contents-table.sql'),
      findAll: sqlFile('find-all-contents.sql'),
      findById: sqlFile('find-content-by-id.sql'),
    },
  },
}
