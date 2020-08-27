const Faker = require('faker')

// TODO: look for or create a custom factory girl adapter instead
function Category(data) {
  Object.assign(this, data)
}

module.exports = factory =>
  factory.define('Category', Category, {
    id: factory.seq('id'),
    label: Faker.random.name,
  })
