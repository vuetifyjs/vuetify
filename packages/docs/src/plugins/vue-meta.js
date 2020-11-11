import Meta from 'vue-meta'

export function useMeta (app) {
  app.use(Meta, { refreshOnceOnNavigation: true })
}
