const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
  webpack: {
    externals: {
      electron: 'electron',
    },
  },
}
