import OurVue, { VueConstructor } from 'vue'
import { VuetifyUseOptions } from 'vuetify/types'
import { consoleError } from './util/console'

export function install (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  if ((install as any).installed) return
  (install as any).installed = true

  if (OurVue !== Vue) {
    consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this')
  }

  const components = args.components || {}
  const directives = args.directives || {}

  for (const name in directives) {
    const directive = directives[name]

    Vue.directive(name, directive)
  }

  (function registerComponents (components: any) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component && !registerComponents(component.$_vuetify_subcomponents)) {
          Vue.component(key, component as typeof Vue)
        }
      }
      return true
    }
    return false
  })(components)

  // Used to avoid multiple mixins being setup
  // when in dev mode and hot module reload
  // https://github.com/vuejs/vue/issues/5089#issuecomment-284260111
  if (Vue.$_vuetify_installed) return
  Vue.$_vuetify_installed = true

  Vue.mixin({
    beforeCreate () {
      const options = this.$options as any

      if (options.vuetify) {
        options.vuetify.init(this, this.$ssrContext)
        this.$vuetify = Vue.observable(options.vuetify.framework)
      } else {
        this.$vuetify = (options.parent && options.parent.$vuetify) || this
      }
    },
    beforeMount () {
      // @ts-ignore
      if (this.$options.vuetify && this.$el && this.$el.hasAttribute('data-server-rendered')) {
        // @ts-ignore
        this.$vuetify.isHydrating = true
        // @ts-ignore
        this.$vuetify.breakpoint.update(true)
      }
    },
    mounted () {
      // @ts-ignore
      if (this.$options.vuetify && this.$vuetify.isHydrating) {
        // @ts-ignore
        this.$vuetify.isHydrating = false
        // @ts-ignore
        this.$vuetify.breakpoint.update()
      }
    },
  })
}
