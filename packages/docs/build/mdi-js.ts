import type { Plugin } from 'vite'
import meta from '@mdi/svg/meta.json' with { type: 'json' }
import * as paths from '@mdi/js'
import { camelize } from 'vue'

const virtual = 'virtual:mdi-js-icons'
const resolvedVirtual = `\0${virtual}`

export function MdiJs () {
  return {
    name: 'vuetify:mdi-js-icons',
    enforce: 'pre',
    resolveId (id) {
      return id === virtual ? resolvedVirtual : undefined
    },
    async load (id) {
      if (id === resolvedVirtual) {
        const icons = meta.map(icon => ({
          name: icon.name,
          aliases: icon.aliases,
          path: paths[camelize('mdi-' + icon.name) as keyof typeof paths],
        }))
        return `export const icons = ${JSON.stringify(icons)}`
      }

      return undefined
    },
  } satisfies Plugin
}
