const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = async ({ config }) => {
  config.resolve.alias['~storybook'] = path.resolve(__dirname)

  config.module.rules = config.module.rules.filter(rule => !rule.loader || rule.loader.indexOf('vue-loader') < 0)
  config.plugins = config.plugins.filter(plugin => !(plugin instanceof VueLoaderPlugin))

  config.module.rules.push({
    test: /\.vue$/,
    loader: './.storybook/story-loader/loader',
  })

  return config
}
