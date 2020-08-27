const pg = require('pg-promise')
const path = require('path')

const sqlFile = filename => {
  const root = process.env.APP_ROOT_PATH || __dirname
  const filePath = path.join(root, 'sql', filename)
  return new pg.QueryFile(filePath, { minify: true })
}

module.exports = {
  sql: {
    categories: {
      createTable: sqlFile('create-categories-table.sql'),
      findAll: sqlFile('find-all-categories.sql'),
    },
  },
}
