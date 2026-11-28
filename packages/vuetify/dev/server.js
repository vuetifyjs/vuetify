import fs from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { transformHtmlTemplate } from '@unhead/vue/server'
import { createServer, isCSSRequest } from 'vite'

const port = Number(process.env.PORT ?? 8090)

const httpServer = createHttpServer()

const vite = await createServer({
  configFile: fileURLToPath(new URL('../vite.config.ts', import.meta.url)),
  server: { middlewareMode: true, hmr: { server: httpServer } },
  appType: 'custom',
})

// Vite injects CSS from JS in dev, so the server has to inline what the page imported.
// data-vite-dev-id lets the client take over these tags for HMR instead of duplicating them.
async function collectStyles (url) {
  const seen = new Set()
  const styles = []

  async function walk (mod) {
    if (!mod || seen.has(mod)) return
    seen.add(mod)

    if (isCSSRequest(mod.url)) {
      // sass partials are file-only watch dependencies without an id
      if (!mod.id) return

      const { default: css } = await vite.ssrLoadModule(mod.url + (mod.url.includes('?') ? '&' : '?') + 'inline')
      styles.push(`<style type="text/css" data-vite-dev-id="${mod.id}">${css}</style>`)
      return
    }

    for (const imported of mod.importedModules) await walk(imported)
  }

  await walk(await vite.environments.ssr.moduleGraph.getModuleByUrl(url))

  return styles.join('\n')
}

httpServer.on('request', (req, res) => {
  vite.middlewares(req, res, async () => {
    try {
      const template = await fs.readFile(new URL('index.html', import.meta.url), 'utf-8')
      const { render } = await vite.ssrLoadModule('/entry-server.js')
      const { html, head } = await render(req.url)
      const styles = await collectStyles('/entry-server.js')

      const page = (await vite.transformIndexHtml(req.url, template))
        .replace('</head>', `${styles}\n</head>`)
        .replace('<!--app-html-->', html)

      res.setHeader('Content-Type', 'text/html')
      res.end(await transformHtmlTemplate(head, page))
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.statusCode = 500
      res.end(e.stack)
    }
  })
})

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
