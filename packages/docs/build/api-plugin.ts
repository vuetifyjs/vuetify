// Imports
import fs from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

const API_ROOT = path.resolve('../api-generator/dist/api')

export default function Api (): Plugin {
  return {
    name: 'vuetify:api',
    enforce: 'pre',
    resolveId (id) {
      return id === 'virtual:api-list' ? '\0' + id : undefined
    },
    async load (id) {
      if (id === '\0virtual:api-list') {
        const files = await fs.readdir(API_ROOT)

        const names = files
          .sort((a, b) => a.localeCompare(b))
          .map(file => `'${file.split('.')[0]}'`)
          .join(', ')

        return `export default [${names}]`
      }
    },
  }
}
