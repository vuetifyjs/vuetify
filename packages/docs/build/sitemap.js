const SitemapPlugin = require('sitemap-webpack-plugin').default
const routes = require('./generate-routes')

const paths = []
for (const route of routes) {
  paths.push({
    path: route.fullPath,
    lastmod: new Date(),
    priority: route.fullPath === '/' ? '1.0' : '0.8',
    changefreq: 'daily',
  })
}

module.exports = new SitemapPlugin('https://vuetifyjs.com', paths)
