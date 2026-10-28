import { createHead } from '@unhead/vue/server'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render (url) {
  const head = createHead()
  const { app, router } = createApp(head)

  await router.push(url)
  await router.isReady()

  return { html: await renderToString(app), head }
}
