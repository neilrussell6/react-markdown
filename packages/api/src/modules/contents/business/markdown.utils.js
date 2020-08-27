const axios = require('axios')
const filePath = require('path')
const { prop } = require('ramda')
const Bluebird = require('bluebird')
const fs = Bluebird.promisifyAll(require('fs'))

// ------------------------------------
// load Markdown
// ... from local (FS) or remote (HTTP)
// ------------------------------------

module.exports.loadMarkdown = source => {
  if (/^http/.test(source)) {
    return axios.get(source).then(prop('data'))
  } else {
    const sourcePath = filePath.join(process.cwd(), 'markdown', source)
    return fs.readFileAsync(sourcePath, 'utf8')
  }
}
