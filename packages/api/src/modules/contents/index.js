const { getContents, getContent } = require('./presentation/handlers')
const { DB } = require('../../common/postgres')

module.exports.getContents = getContents({ DB })
module.exports.getContent = getContent({ DB })
