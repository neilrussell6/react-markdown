const express = require('express')
const {
  assoc,
  compose,
  map,
  path,
  find,
  propEq,
  isNil,
  pick,
} = require('ramda')
const Bluebird = require('bluebird')
const fs = Bluebird.promisifyAll(require('fs'))
const filePath = require('path')
const cors = require('cors')

const PORT = process.env.PORT
const app = express()
app.use(cors({ origin: '*' }))
const APP_PATH = process.cwd()

// ====================================
// utils
// ====================================

// ------------------------------------
// utils : get by id
// ------------------------------------

const findAll = (path) =>
  fs.readFileAsync(path, 'utf8').then((x) => JSON.parse(x))

const findById = (path, id) =>
  fs
    .readFileAsync(path, 'utf8')
    .then((x) => JSON.parse(x))
    .then(find(propEq('id', id)))

// ====================================
// API
// ====================================

const buildResponse = (res, id, data) => {
  // ... not found
  if (isNil(data)) {
    return res.status(404).send('Not found')
  }

  // ... success
  return res.json(data)
}

// ------------------------------------
// /categories
// ------------------------------------

app.get('/categories', async (req, res) => {
  const jsonPath = filePath.join(APP_PATH, process.env.CATEGORY_JSON)
  const data = await findAll(jsonPath)
  return res.json(data)
})

// ------------------------------------
// /contents
// ------------------------------------

app.get('/contents', async (req, res) => {
  const jsonPath = filePath.join(APP_PATH, process.env.CONTENT_JSON)
  const data = await findAll(jsonPath)
  return compose(
    (x) => res.json(x),
    map(pick(['id', 'categoryId', 'label'])),
  )(data)
})

// ------------------------------------
// /contents/:id
// ------------------------------------

app.get('/contents/:id', async (req, res) => {
  const id = compose((x) => parseInt(x), path(['params', 'id']))(req)
  const jsonPath = filePath.join(APP_PATH, process.env.CONTENT_JSON)
  const data = await findById(jsonPath, id)
  const markdownPath = filePath.join(
    APP_PATH,
    process.env.MARKDOWN_DIRECTORY,
    data.markdown,
  )
  const markdown = await fs.readFileAsync(markdownPath, 'utf8')
  return buildResponse(res, id, assoc('markdown', markdown, data))
})

// ------------------------------------
// API
// ------------------------------------

app.listen(PORT, () =>
  console.log(`API : listening on port http://localhost:${PORT}`),
)
