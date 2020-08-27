const Bluebird = require('bluebird')
const { errors } = require('pg-promise')
const path = require('path')

const { connection: DB } = require('./connection')
const sql = require('./sql')

const { QueryResultError } = errors

module.exports.migrationStateStore = {
  load: fn =>
    DB.task(task =>
      Bluebird.resolve(task)
        // ensure migrations table
        .tap(x => x.none(sql.createTable))
        // load the single row of migration data from the database
        .then(x => x.one(sql.find))
        .tap(({ data }) => {
          fn(null, data)
        })
        .catch(QueryResultError, () => {
          console.warn(
            'Cannot read migrations from database. If this is the first time you run migrations, then this is normal.',
          )
          fn(null, {})
        }),
    ),
  save: (set, fn) =>
    DB.task(task =>
      Bluebird.resolve(task)
        // ensure migrations table
        .tap(x => x.none(sql.createTable))
        // create migration
        .tap(x =>
          x.none(sql.create, [
            {
              lastRun: set.lastRun,
              migrations: set.migrations,
            },
          ]),
        )
        .tap(() => {
          fn()
        }),
    ),
}

module.exports.handleMigrationError = (name, message) => e => {
  const filePath = path.relative(process.cwd(), __filename)
  console.error(`${filePath} :: ${name} :: ERROR :: ${message}`)
  console.error(e.stack)
  return Promise.reject(e)
}
