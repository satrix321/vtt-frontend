const withSass = require('@zeit/next-sass')
const sass = require('sass')

module.exports = {
  ...withSass({
    cssModules: true,
    sassLoaderOptions: {
      implementation: sass,
    },
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
  }),
  env: {
    useMockApi: false,
    apiBaseUrl: 'http://localhost:4000/',
  },
}