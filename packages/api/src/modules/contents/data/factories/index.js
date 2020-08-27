const { factory } = require('factory-girl')

const { registerFactories } = require('../../../../common/data/factory.utils')
const Content = require('./content.factory')

// ------------------------------------
// factories
// uses:
//  1. build realistic data in tests
//     - without bloating tests with noise (unrelated data)
//     - while still customising the data in significant ways (related data)
//  2. generate fake / seed data for
//     - local development
//     - QA
//     - demo
// ------------------------------------

registerFactories(factory)({
  Content,
})

module.exports = factory
