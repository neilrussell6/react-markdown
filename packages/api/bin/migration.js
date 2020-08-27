const Bluebird = require('bluebird')
const migrate = require('migrate')
const { existsSync } = require('fs')
const { isNil } = require('ramda')

const { migrationStateStore: stateStore } = require('../src/common/postgres')

// ------------------------------------
// constants
// ------------------------------------

const ERROR_NO_MIGRATION_DIRECTORY = 'ERROR_NO_MIGRATION_DIRECTORY'
const ERROR_MIGRATION_INVALID_COMMAND = 'ERROR_MIGRATION_INVALID_COMMAND'
const ERROR_MIGRATION_NO_COMMAND = 'ERROR_MIGRATION_NO_COMMAND'

// ------------------------------------
// migrate
// ------------------------------------

module.exports.migrate = command =>
  new Bluebird((resolve, reject) => {
    if (isNil(command)) {
      return reject(new Error(ERROR_MIGRATION_NO_COMMAND))
    }

    // TODO: move to env
    const migrationsDirectory = 'data/migrations'
    if (!existsSync(migrationsDirectory)) {
      return reject(new Error(ERROR_NO_MIGRATION_DIRECTORY))
    }

    return migrate.load({ stateStore, migrationsDirectory }, (error, set) => {
      if (error) {
        return reject(error)
      }

      if (typeof set[command] !== 'function') {
        return reject(new Error(ERROR_MIGRATION_INVALID_COMMAND))
      }

      return set[command](e => (e ? reject(e) : resolve()))
    })
  })
