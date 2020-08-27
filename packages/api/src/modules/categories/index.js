const { getCategories } = require('./presentation/handlers')
const { DB } = require('../../common/postgres')

module.exports.getCategories = getCategories({ DB })
