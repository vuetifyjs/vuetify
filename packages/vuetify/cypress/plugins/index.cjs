const { startDevServer } = require('@cypress/vite-dev-server')

module.exports = (on, config) => {
  on('dev-server:start', async options => {
      const viteConfig = await import('../../vite.config.mjs')
      return startDevServer({ options, viteConfig })
    }
  )

  return config
}
