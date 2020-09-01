// Globals
import { IS_SERVER } from '@/util/globals'

export async function useMeta (app) {
  if (IS_SERVER) return

  const Meta = await import('vue-meta')

  app.use(Meta)
}
