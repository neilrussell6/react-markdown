const path = require('path')
const pg = require('pg-promise')

const sqlFile = filename => new pg.QueryFile(path.join(__dirname, 'sql', filename), { minify: true })

module.exports = {
  createTable: sqlFile('create-migrations-table.sql'),
  find: sqlFile('find-migration.sql'),
  create: sqlFile('create-migration.sql'),
}
