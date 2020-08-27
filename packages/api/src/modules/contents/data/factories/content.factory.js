const Faker = require('faker')

// TODO: look for or create a custom factory girl adapter instead
function Content(data) {
  Object.assign(this, data)
}

module.exports = factory =>
  factory.define('Content', Content, {
    id: factory.seq('id'),
    category_id: Faker.random.number,
    label: Faker.lorem.sentence,
    markdown: Faker.internet.url,
    markdownContent: Faker.lorem.paragraph,
  })
