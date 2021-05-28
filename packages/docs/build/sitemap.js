const SitemapPlugin = require('sitemap-webpack-plugin').default
const routes = require('./generate-routes')

const paths = []
for (const route of routes) {
  paths.push({
    path: route.fullPath,
    lastmod: new Date().toISOString(),
    priority: route.fullPath === '/' ? 1 : 0.8,
    changefreq: 'daily',
  })
}

module.exports = new SitemapPlugin({
  base: 'https://vuetifyjs.com',
  paths,
})
