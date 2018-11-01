const requireModule = require.context('.', true, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  const path = fileName.replace(/(\.\/|\.js)/g, '')
  const [moduleName, imported] = path.split('/')

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true
    }
  }

  modules[moduleName][imported] = requireModule(fileName).default
})

export default modules
