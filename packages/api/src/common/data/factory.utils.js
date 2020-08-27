const { compose, keys, prop, pickBy, complement, includes, map } = require('ramda')

// ------------------------------------
// register factories
// ... this solves some issues
// ... with factories and running tests
// ... in watch mode
// ... TODO: describe this in more detail ^ (I can't remember the the time of writing this)
// ------------------------------------

module.exports.registerFactories = factory => factories => {
  const registeredFactories = compose(keys, prop('factories'))(factory)
  // register factories (if not already registered)
  compose(
    map(f => f(factory)),
    pickBy((v, k) => complement(includes)(k, registeredFactories)),
  )(factories)
}
