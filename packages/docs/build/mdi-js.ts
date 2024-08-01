import type { Plugin } from 'vite'

export function MdiJs () {
  const virtual = 'virtual:mdi-js-icons'
  const resolvedVirtual = `\0${virtual}`
  const icons = import('@mdi/svg/meta.json', {
    assert: { type: 'json' },
  })

  return {
    name: 'vuetify:mdi-js-icons',
    enforce: 'pre',
    resolveId (id) {
      return id === virtual ? resolvedVirtual : undefined
    },
    async load (id) {
      if (id === resolvedVirtual) {
        return `export const icons = ${JSON.stringify(await icons
          .then(i => i.default)
          .then(i => i.map(i => ({
            name: i.name,
            aliases: i.aliases,
          }))))}`
      }

      return undefined
    },
  } satisfies Plugin
}
