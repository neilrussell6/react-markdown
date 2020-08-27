const { map } = require('ramda')

const { sql } = require('../data')
const { mapCategoryFromDB } = require('./data-mapping.utils')

const { categories } = sql

// ------------------------------------
// find all categories
// ------------------------------------

module.exports.findAllCategories = ({ DB }) => () => DB.any(categories.findAll).then(map(mapCategoryFromDB))
