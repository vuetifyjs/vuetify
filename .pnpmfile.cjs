module.exports = {
  hooks: {
    readPackage (pkg, context) {
      if (pkg.name === 'vite-ssr') {
        delete pkg.dependencies['react-router-dom']
        delete pkg.dependencies['react-ssr-prepass']
        pkg.peerDependencies.vite = '*'
        pkg.peerDependencies['@vueuse/head'] = '*'
        pkg.peerDependencies['@vitejs/plugin-vue'] = '*'
      }
      if (['vite-plugin-warmup', 'unplugin-fonts', 'vite-plugin-md'].includes(pkg.name)) {
        pkg.peerDependencies.vite = '*'
      }
      if (['@rollup/pluginutils', 'rollup-plugin-terser', '@rollup/plugin-replace'].includes(pkg.name)) {
        pkg.peerDependencies.rollup = '*'
      }
      return pkg
    }
  }
}
