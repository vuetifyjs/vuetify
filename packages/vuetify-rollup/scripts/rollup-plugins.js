import path from 'path'

export function rewriteSassPaths () {
  return {
    name: 'rewrite-sass-paths',
    async resolveId (source, importer) {
      if (source.endsWith('.sass')) {
        const from = path.dirname(path.resolve(importer.replace('src', 'lib')))
        const to = path.dirname(path.resolve(importer))
        const relativePath = path.relative(from, to).replace(/\\/g, '/')
        return { id: `${relativePath}/${source.slice(2)}`, external: true }
      }
      return null // other ids should be handled as usually
    },
  }
}

export function rewriteVueEsmPath () {
  return {
    name: 'rewrite-vue-esm-path',
    async resolveId (source) {
      if (source === 'vue') {
        return { id: '/node_modules/vue/dist/vue.esm-browser.js', external: true }
      }
    },
  }
}

export function test () {
  return {
    name: 'test',
    async resolveId (source) {
      console.log(source)
      if (source.endsWith('.sass')) return source
      return null
    },
  }
}
