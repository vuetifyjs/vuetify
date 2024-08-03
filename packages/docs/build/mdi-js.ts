import type { Plugin } from 'vite'

export function MdiJs () {
  const virtual = 'virtual:mdi-js-icons'
  const resolvedVirtual = `\0${virtual}`
  const iconsPromise = import('@mdi/svg/meta.json', {
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
        const icons = await iconsPromise.then(i => i.default.map(i => ({
          name: i.name,
          aliases: i.aliases,
        })))
        return `export const icons = ${JSON.stringify(icons)}`
      }

      return undefined
    },
  } satisfies Plugin
}
