const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { pipe, map, toPairs } = require('ramda')

// ------------------------------------
// utils
// ------------------------------------

const buildAssetCopyPatterns = ({ entryPath, outputDirPath}) => pipe(
  toPairs,
  map(([x, y]) => ({
    from: path.join(__dirname, 'node_modules', entryPath, x),
    to: path.join(__dirname, outputDirPath, y),
    flatten: true,
  })),
)

// ------------------------------------
// config
// ------------------------------------

const entryPath = '@react-markdown/api'
const outputName = 'api-handlers'
const outputDirPath = 'assets'
const assets = {
  'src/modules/categories/data/sql/**/*.sql': 'sql',
  'src/modules/contents/data/sql/**/*.sql': 'sql',
}

// ------------------------------------
// webpack
// ------------------------------------

module.exports = {
  mode: 'production',
  entry: entryPath,
  target: 'node', // required for libs like fs (that libs like winston will attempt to import)
  output: {
    path: path.join(__dirname, outputDirPath),
    filename: `${outputName}.js`,
    library: outputName,
    libraryTarget: 'commonjs2', // required module type for AWS Lambda
  },
  plugins: [
    // copy all asset files to assets dir
    new CopyPlugin({
      patterns: buildAssetCopyPatterns({ entryPath, outputDirPath })(assets),
      options: {
        concurrency: 100,
      },
    }),
    // zip assets dir including bundled JS
    new ZipPlugin({
      filename: `${outputName}.zip`,
      include: [/\.js$/, /\.sql$/],
      exclude: [],
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },
      zipOptions: {
        forceZip64Format: false,
      },
    }),
  ],
}
