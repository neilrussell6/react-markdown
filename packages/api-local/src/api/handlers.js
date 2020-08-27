const { Router } = require('express')
const { getContents, getContent, getCategories } = require('@react-markdown/api')

const { mapHandlerToExpress } = require('./utils')

const router = new Router()

router.get('/categories', mapHandlerToExpress(getCategories))

router.get('/contents', mapHandlerToExpress(getContents))
router.get('/contents/:id', mapHandlerToExpress(getContent))

module.exports = router
