const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default
const { generateRoutes } = require('./generate-routes')

class SitemapPlugin {
  apply (compiler) {
    const routes = generateRoutes()

    const paths = []
    for (const route of routes) {
      let priority = 0.5

      if (route.fullPath === '/') priority = 1.0
      else if (route.fullPath.includes('/components')) priority = 0.8
      else if (route.fullPath.includes('/api')) priority = 0.7

      paths.push({
        path: route.fullPath,
        lastmod: new Date().toISOString(),
        priority,
        changefreq: 'daily',
      })
    }

    const plugin = new SitemapWebpackPlugin({
      base: 'https://vuetifyjs.com',
      paths,
    })

    plugin.apply(compiler)
  }
}

module.exports = new SitemapPlugin()
