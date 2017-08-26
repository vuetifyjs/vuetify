import load from '../../util/load'

export default {
  install (Vue, opts = {}) {
    const $vuetify = {
      load,
      breakpoint: {}
    }

    Vue.util.defineReactive($vuetify, 'breakpoint')

    Vue.prototype.$vuetify = $vuetify

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key]
        if (c.name !== undefined && c.name.startsWith('v-')) {
          Vue.use(c)
        }
      })
    }
  }
}
