const { isNil, identity } = require('ramda')
const pgp = require('pg-promise')({
  // initialization options & global event notification
  capSQL: true, // capitalize all generated SQL
})

const { DATE, TIMESTAMP } = pgp.pg.types.builtins

// stop node-postgres from parsing these types
// TODO: check if this is still necessary with PG Promise
pgp.pg.types.setTypeParser(DATE, identity)
pgp.pg.types.setTypeParser(TIMESTAMP, identity)

const connectionDetails = !isNil(process.env.DATABASE_URL)
  ? process.env.DATABASE_URL
  : `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

const connection = pgp(connectionDetails)

module.exports.connection = connection
module.exports.pgp = pgp
