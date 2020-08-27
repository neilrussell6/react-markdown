const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const api = require('./api/handlers')

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(api)

let server = null

module.exports = {
  start: port => {
    server = app.listen(port, () => {
      console.log(`API started on port ${port}`)
    })
  },
  stop() {
    server.close()
  },
}
