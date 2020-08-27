const { txMode } = require('pg-promise')
const Bluebird = require('bluebird')

const { DB } = require('../postgres')

// ------------------------------------
// transaction mode
// ------------------------------------

const { TransactionMode, isolationLevel } = txMode

const mode = new TransactionMode({
  tiLevel: isolationLevel.serializable,
  readOnly: false,
})

// ------------------------------------
// transaction it
// ... create a postgres transaction
// ... provides the tx to the test callback eg.
// ... txit('should ...' (tx) => {
// ... then rolls back any changes after the test fails or succeeds
// ------------------------------------

module.exports.txit = (msg, f) =>
  it(msg, async () => {
    // DB.tx
    // - executes a callback function
    // - and wraps a regular task into additional queries:
    //   1. executes BEGIN just before invoking the callback function
    //   2. if the callback function succeeds it executes COMMIT
    //      if the callback throws or rejects it executes ROLLBACK
    //   3. it executes corresponding SAVEPOINT commands when tx is called recursively
    await Bluebird
      // reject to execute ROLLBACK
      .resolve(DB.tx({ mode }, tx => f(tx).then(() => Bluebird.reject(new Error('ROLLBACK')))))
      // only handle the above error ^ to avoid catching test failures
      // DB.tx will catch other errors (causing a rollback)
      // but will also rethrow so test output works as expected
      .catch({ name: 'Error', message: 'ROLLBACK' }, () => {
        return null
      })
  })
