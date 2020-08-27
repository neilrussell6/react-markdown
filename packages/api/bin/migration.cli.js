const Migration = require('./migration')

// ------------------------------------
// hack CLI
// ------------------------------------

const args = process.argv.slice(2)

Migration[args[0]](...args.slice(1))
  .then(() => {
    process.exit(0)
  })
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
