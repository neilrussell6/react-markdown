const { map } = require('ramda')

const { sql } = require('../data')
const { mapContentFromDB } = require('./data-mapping.utils')

const { contents } = sql

// ------------------------------------
// find all content
// ------------------------------------

module.exports.findAllContent = ({ DB }) => () => DB.any(contents.findAll).then(map(mapContentFromDB))

// ------------------------------------
// find content by id
// ------------------------------------

module.exports.findContent = ({ DB }) => id => DB.one(contents.findById, [parseInt(id, 10)]).then(mapContentFromDB)
