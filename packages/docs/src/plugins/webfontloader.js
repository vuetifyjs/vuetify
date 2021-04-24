/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

// Globals
import { IS_SERVER } from '@/util/globals'

export async function loadFonts (app) {
  const loaded = []

  const webFontLoader = !IS_SERVER
    ? await import(/* webpackChunkName: "webfontloader" */'webfontloader')
    : { load: () => {} }

  app.prototype.$load = pending => {
    if (!pending) return

    const urls = pending.filter(url => !loaded.includes(url))

    if (!urls.length) return

    loaded.push(...urls)

    webFontLoader.load({
      custom: { urls },
      timeout: 2000,
    })
  }

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  })
}
