// Globals
import { IN_BROWSER, IS_SERVER } from '@/util/globals'

export async function useMeta (app) {
  if (IS_SERVER || !IN_BROWSER) return

  const Meta = await import('vue-meta')

  app.use(Meta)
}
