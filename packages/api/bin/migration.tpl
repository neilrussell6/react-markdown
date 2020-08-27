/* eslint-disable import/no-extraneous-dependencies */
const { db, handleMigrationError: error } = require('../../../../common/postgres')
//const { $MODULE_CAMELCASE } = require('../sql')

module.exports.up = next => db.task(task => Promise
  .resolve(task)
  //.then(x => x.none($MODULE_CAMELCASE.???))
  //.catch(error('UP', 'could not ???'))
  .tap(() => { next() }))

module.exports.down = next => db.task(task => Promise
  .resolve(task)
  //.then(x => x.none($MODULE_CAMELCASE.???))
  //.catch(error('DOWN', 'could not ???'))
  .tap(() => { next() }))
