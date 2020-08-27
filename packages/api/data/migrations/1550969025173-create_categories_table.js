const Bluebird = require('bluebird')

const { DB, handleMigrationError: error } = require('../../src/common/postgres')
const { sql } = require('../../src/modules/categories/data')

module.exports.up = next =>
  DB.task(task =>
    Bluebird.resolve(task)
      .then(x => x.none(sql.categories.createTable))
      .catch(error('UP', 'could not create contents table'))
      .tap(() => {
        next()
      }),
  )

module.exports.down = next =>
  DB.task(task =>
    Bluebird.resolve(task)
      .tap(x => x.none('DROP TABLE contents;'))
      .catch(error('DOWN', 'could not drop contents table'))
      .tap(() => {
        next()
      }),
  )
