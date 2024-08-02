// Utilities
import { strFromU8, strToU8, zlibSync } from 'fflate'
import { version as vuetifyVersion } from 'vuetify'
import { version as vueVersion } from 'vue'

// This is copied directly from playground
function utoa (data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

export function usePlayground (
  sections: ({ name: string, content: string, language: string})[] = [],
  css: string[] = [],
  imports: Record<string, string> = {},
  setup?: string,
) {
  const files: Record<string, string> = {
    'App.vue': sections
      .filter(section => ['script', 'template', 'style'].includes(section.name))
      .map(section => section.content.replace(/i-mdi:/g, 'mdi-'))
      .join('\n\n'),
    'links.json': JSON.stringify({ css }),
    'import-map.json': JSON.stringify({ imports }),
  }

  if (setup) {
    files['vuetify.js'] = setup
  }

  const hash = utoa(JSON.stringify([files, vueVersion, vuetifyVersion, true]))

  return `https://play.vuetifyjs.com#${hash}`
}
