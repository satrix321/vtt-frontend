const withSass = require('@zeit/next-sass')
const sass = require('sass')

module.exports = {
  ...withSass({
    cssModules: false,
    sassLoaderOptions: {
      implementation: sass,
    },
  }),
  env: {
    useMockApi: true,
  },
}