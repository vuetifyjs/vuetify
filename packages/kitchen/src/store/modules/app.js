import { set } from '@/utils/vuex'

function parseTemplate (target, template) {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []
  return parsed[1] || ''
}

export default {
  namespaced: true,

  state: {
    component: null,
    raw: null
  },

  getters: {
    cooking: state => state.component ? state.component.name : null,
    ingredients: state => {
      const template = parseTemplate('template', state.raw)
      const style = parseTemplate('style', state.raw)
      const script = parseTemplate('script', state.raw)
      const codepenResources = parseTemplate('codepen-resources', state.raw)
      const codepenAdditional = parseTemplate('codepen-additional', state.raw)

      return {
        template,
        style,
        script,
        codepenResources,
        codepenAdditional
      }
    }
  },

  mutations: {
    setComponent: set('component'),
    setRaw: set('raw')
  }
}
